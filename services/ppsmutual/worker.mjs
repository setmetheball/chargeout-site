import events from '../../ppsmutual/events.json' with { type: 'json' };

const dietaryOptions = ['none','vegetarian','vegan','gluten-free','dairy-free','halal','other'];
const json = (data, status=200) => new Response(JSON.stringify(data), {status, headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const hash = async (s) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,'0')).join('');
const origins = (env) => (env.ALLOWED_ORIGINS || 'https://chargeout.net,https://www.chargeout.net').split(',').map(x=>x.trim());
function withCors(response, request, env) {
  const origin=request.headers.get('Origin');
  const headers=new Headers(response.headers); headers.set('Vary','Origin');
  if (origin && origins(env).includes(origin)) headers.set('Access-Control-Allow-Origin',origin);
  headers.set('Access-Control-Allow-Methods','GET,POST,PATCH,OPTIONS');
  headers.set('Access-Control-Allow-Headers','Content-Type,Authorization,Idempotency-Key');
  return new Response(response.body,{status:response.status,headers});
}
export function validate(data) {
  const text = (key,max,required=false) => { const value=data[key]; if (value !== undefined && typeof value !== 'string') throw new Error(`Invalid ${key}.`); const v=(value || '').trim(); if (v.length>max || (required && !v)) throw new Error(`Please check ${key}.`); return v; };
  const result={city:text('city',20,true),firstName:text('firstName',80,true),lastName:text('lastName',80,true),email:text('email',254,true).toLowerCase(),organisation:text('organisation',160,true),phone:text('phone',30),dietary:text('dietary',30,true),dietaryNotes:text('dietaryNotes',1000)};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email) || /[\r\n]/.test(result.email)) throw new Error('Please enter a valid email address.');
  if (!dietaryOptions.includes(result.dietary)) throw new Error('Please choose a dietary option.');
  if (data.consent!==true) throw new Error('Please agree to the event privacy notice.');
  return result;
}
export function organiserForCity(env, city) {
  try { const email=JSON.parse(env.ORGANISER_EMAILS || '{}')[city]; return typeof email==='string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null; } catch { return null; }
}
function configured(env) { return env.REGISTRATION_OPEN==='true' && env.DB && env.RESEND_API_KEY && env.EMAIL_FROM && events.cities.every(c=>organiserForCity(env,c.id)) && env.TURNSTILE_SECRET && env.ADMIN_TOKEN?.length>=32; }
async function authenticate(request,env) {
  if (!env.ADMIN_TOKEN || env.ADMIN_TOKEN.length<32) return false;
  const token=request.headers.get('Authorization') || '';
  return (await hash(token)) === (await hash(`Bearer ${env.ADMIN_TOKEN}`));
}
function eventText(event) { return [events.title,event.name,event.dateLabel,event.timeLabel,event.venue,event.address].filter(Boolean).join('\n'); }
export function emailPayloads(data,event,id,env,now=Date.now()) {
  const reply=env.REPLY_TO || 'info@chargeout.net';
  const base={from:env.EMAIL_FROM,reply_to:reply};
  const confirmation={...base,to:[data.email],subject:`You're registered: ${events.title} — ${event.name}`,text:`Hi ${data.firstName},\n\nYour place is confirmed.\n\n${eventText(event)}\n\nDietary requirements: ${data.dietary}${data.dietaryNotes ? '\nCatering notes: '+data.dietaryNotes : ''}\n\nRegistration reference: ${id}\n\nWe look forward to seeing you. To change your details or cancel, reply to this email.\n\nPPS Mutual Adviser Connect 2026`};
  const alert={...base,to:[organiserForCity(env,event.id)],subject:`New lunch registration — ${event.name}`,text:`${data.firstName} ${data.lastName} has registered.\n\nPractice: ${data.organisation}\nEmail: ${data.email}\nCity: ${event.name}\nReference: ${id}\n\nView the protected organiser dashboard for the attendance list and catering details:\n${env.SITE_URL || 'https://chargeout.net/ppsmutual'}/admin.html`};
  const reminder={...base,to:[data.email],subject:`Reminder: ${events.title} — ${event.name}`,text:`Hi ${data.firstName},\n\nWe look forward to seeing you at Adviser Connect.\n\n${eventText(event)}\n\nYour registration reference: ${id}\n\nIf your plans or dietary requirements have changed, please reply to this email.\n\nPPS Mutual Adviser Connect 2026`};
  return [{kind:'confirmation',payload:confirmation,due:now},{kind:'organiser',payload:alert,due:now},{kind:'reminder',payload:reminder,due:Math.max(now,new Date(event.start).getTime()-24*60*60*1000)}];
}
async function register(request,env,ctx) {
  if (!configured(env)) return json({error:'Registrations are not open yet. Please check back soon.'},503);
  if (!origins(env).includes(request.headers.get('Origin'))) return json({error:'This registration request is not allowed.'},403);
  if (!request.headers.get('Content-Type')?.includes('application/json')) return json({error:'Please submit the registration form.'},415);
  const raw=await request.text(); if (raw.length>12000) return json({error:'The submitted details are too long.'},413);
  let input,data; try { input=JSON.parse(raw); if (!input || typeof input!=='object' || Array.isArray(input)) throw new Error('Invalid form.'); data=validate(input); } catch(error) { return json({error:error.message || 'Please check your registration details.'},400); }
  if (input.website) return json({error:'This registration could not be accepted.'},400);
  const event=events.cities.find(x=>x.id===data.city);
  if (!event?.start || new Date(event.start).getTime()<=Date.now()) return json({error:'Registration for this city is not available yet, or the event has ended.'},409);
  const key=request.headers.get('Idempotency-Key') || '';
  if (!/^[a-zA-Z0-9-]{16,80}$/.test(key)) return json({error:'Please refresh the form before registering.'},400);
  const payloadHash=await hash(JSON.stringify(data));
  const existing=await env.DB.prepare('SELECT id,payload_hash FROM registrations WHERE request_key=?').bind(key).first();
  if (existing) return existing.payload_hash===payloadHash ? json({reference:existing.id,event}) : json({error:'The form changed after submission. Refresh to start a new registration.'},409);
  const ip=request.headers.get('CF-Connecting-IP') || 'unknown'; const hour=Math.floor(Date.now()/3600000);
  const rateKey=await hash(ip+':'+hour);
  const limit=await env.DB.prepare('INSERT INTO rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(rateKey,(hour+2)*3600000).first();
  if (limit.count>20) return json({error:'Too many attempts. Please try again later.'},429);
  if (typeof input.turnstileToken!=='string' || !input.turnstileToken || input.turnstileToken.length>2048) return json({error:'Please complete the security check.'},400);
  const check=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET,response:input.turnstileToken,remoteip:ip})});
  const verification=await check.json();
  const allowedHosts=origins(env).map(x=>new URL(x).hostname);
  if (!verification.success || !allowedHosts.includes(verification.hostname)) return json({error:'The security check expired. Please try again.'},400);
  const duplicate=await env.DB.prepare('SELECT id FROM registrations WHERE event_id=? AND email=?').bind(event.id,data.email).first();
  if (duplicate) return json({error:'A registration already exists for this email and city. Check your confirmation email, or contact info@chargeout.net to change it.'},409);
  const id=crypto.randomUUID(); const now=Date.now(); const timestamp=new Date(now).toISOString();
  const jobs=emailPayloads(data,event,id,env,now);
  const statements=[env.DB.prepare('INSERT INTO registrations (id,request_key,payload_hash,event_id,first_name,last_name,email,organisation,phone,dietary,dietary_notes,consent_at,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,key,payloadHash,event.id,data.firstName,data.lastName,data.email,data.organisation,data.phone,data.dietary,data.dietaryNotes,timestamp,timestamp),...jobs.map(job=>env.DB.prepare('INSERT INTO email_jobs (id,registration_id,kind,payload,due_at) VALUES (?,?,?,?,?)').bind(`${id}:${job.kind}`,id,job.kind,JSON.stringify(job.payload),job.due))];
  try { await env.DB.batch(statements); } catch(error) {
    const raced=await env.DB.prepare('SELECT id,payload_hash FROM registrations WHERE request_key=?').bind(key).first();
    if (raced?.payload_hash===payloadHash) return json({reference:raced.id,event});
    const repeated=await env.DB.prepare('SELECT id FROM registrations WHERE event_id=? AND email=?').bind(event.id,data.email).first();
    if (repeated) return json({error:'A registration already exists for this email and city. Contact info@chargeout.net to change it.'},409);
    throw error;
  }
  ctx.waitUntil(processEmails(env));
  return json({reference:id,event},201);
}
export async function processEmails(env,now=Date.now()) {
  if (!env.DB || !env.RESEND_API_KEY) return;
  await env.DB.prepare("UPDATE email_jobs SET status='pending',lease_until=NULL WHERE status='sending' AND lease_until<?").bind(now).run();
  const {results}=await env.DB.prepare("SELECT * FROM email_jobs WHERE status='pending' AND due_at<=? ORDER BY due_at LIMIT 25").bind(now).all();
  for (const job of results) {
    const registration=await env.DB.prepare('SELECT cancelled_at,event_id FROM registrations WHERE id=?').bind(job.registration_id).first();
    const event=events.cities.find(x=>x.id===registration?.event_id);
    if (registration?.cancelled_at || (job.kind==='reminder' && (!event?.start || new Date(event.start).getTime()<=now))) {
      await env.DB.prepare("UPDATE email_jobs SET status='cancelled' WHERE id=? AND status='pending'").bind(job.id).run(); continue;
    }
    // Resend idempotency keys expire after 24h; stop retries before that window ends.
    if (job.first_attempt_at && now-job.first_attempt_at>23*3600000) {
      await env.DB.prepare("UPDATE email_jobs SET status='failed',last_error='Retry window expired; review delivery before retrying' WHERE id=? AND status='pending'").bind(job.id).run(); continue;
    }
    const claim=await env.DB.prepare("UPDATE email_jobs SET status='sending',lease_until=?,attempts=attempts+1,first_attempt_at=COALESCE(first_attempt_at,?) WHERE id=? AND status='pending' RETURNING id").bind(now+120000,now,job.id).first();
    if (!claim) continue;
    try {
      const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':job.id},body:job.payload,signal:AbortSignal.timeout(15000)});
      if (!response.ok) { const error=new Error('Email provider returned '+response.status); error.permanent=response.status>=400 && response.status<500 && ![408,409,429].includes(response.status); throw error; }
      const result=await response.json();
      if (!result.id) throw new Error('Email provider did not confirm acceptance');
      await env.DB.prepare("UPDATE email_jobs SET status='sent',provider_id=?,lease_until=NULL,last_error=NULL WHERE id=? AND status='sending'").bind(result.id,job.id).run();
    } catch(error) {
      await env.DB.prepare('UPDATE email_jobs SET status=?,due_at=?,lease_until=NULL,last_error=? WHERE id=? AND status=\'sending\'').bind(error.permanent?'failed':'pending',now+Math.min(3600000,60000*2**Math.min(job.attempts,6)),String(error.message).slice(0,200),job.id).run();
    }
  }
  await env.DB.prepare('DELETE FROM rate_limits WHERE expires_at<?').bind(now).run();
}
async function route(request,env,ctx) {
  const path=new URL(request.url).pathname;
  if (request.method==='OPTIONS') return new Response(null,{status:204});
  if (path==='/health' && request.method==='GET') return json({registrationOpen:Boolean(configured(env))});
  if (path==='/registrations' && request.method==='POST') return register(request,env,ctx);
  if (path.startsWith('/admin/')) {
    if (!await authenticate(request,env)) return json({error:'Please enter a valid organiser access key.'},401);
    if (!env.DB) return json({error:'The registration database is not configured.'},503);
    if (path==='/admin/registrations' && request.method==='GET') {
      const {results}=await env.DB.prepare('SELECT id,event_id,first_name,last_name,email,organisation,phone,dietary,dietary_notes,created_at,cancelled_at FROM registrations ORDER BY created_at DESC LIMIT 5000').all();
      const jobs=await env.DB.prepare('SELECT registration_id,kind,status,last_error FROM email_jobs').all();
      return json({registrations:results.map(r=>({...r,emails:jobs.results.filter(j=>j.registration_id===r.id).map(({kind,status,last_error})=>({kind,status,last_error}))}))});
    }
    if (path.startsWith('/admin/registrations/') && request.method==='PATCH') {
      const id=path.slice('/admin/registrations/'.length);
      if (!/^[a-f0-9-]{36}$/.test(id)) return json({error:'Invalid registration reference.'},400);
      const body=await request.json(); if (body.cancel!==true) return json({error:'Only cancellation is supported here.'},400);
      const existing=await env.DB.prepare('SELECT id FROM registrations WHERE id=?').bind(id).first(); if (!existing) return json({error:'Registration not found.'},404);
      await env.DB.batch([env.DB.prepare('UPDATE registrations SET cancelled_at=COALESCE(cancelled_at,?) WHERE id=?').bind(new Date().toISOString(),id),env.DB.prepare("UPDATE email_jobs SET status='cancelled' WHERE registration_id=? AND status='pending'").bind(id)]);
      return json({cancelled:true});
    }
  }
  return json({error:'Not found.'},404);
}
export default {
  async fetch(request,env,ctx) {
    try { return withCors(await route(request,env,ctx),request,env); }
    catch { return withCors(json({error:'The service is temporarily unavailable. Please try again shortly.'},500),request,env); }
  },
  async scheduled(controller,env,ctx) { ctx.waitUntil(processEmails(env)); }
};
