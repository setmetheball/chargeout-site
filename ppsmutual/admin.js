const $=id=>document.getElementById(id);
const preview=new URLSearchParams(location.search).get('preview')==='1';
let config,token='',registrations=[];
const cityName=id=>config.cities.find(c=>c.id===id)?.name || id;
function selected(){return registrations.filter(r=>!$('city-filter').value || r.event_id===$('city-filter').value);}
function render(){
  $('stats').replaceChildren();
  for(const [label,count] of [['Attending',registrations.filter(r=>!r.cancelled_at).length],...config.cities.map(c=>[c.name,registrations.filter(r=>r.event_id===c.id&&!r.cancelled_at).length]),['Dietary needs',registrations.filter(r=>!r.cancelled_at&&(r.dietary!=='none'||r.dietary_notes)).length]]){
    const div=document.createElement('div');div.className='stat';const number=document.createElement('b');number.textContent=count;const text=document.createElement('span');text.textContent=label;div.append(number,text);$('stats').append(div);
  }
  $('rows').replaceChildren();
  for(const r of selected()){
    const tr=document.createElement('tr');
    const emails=r.emails.map(e=>`${e.kind}: ${e.status}${e.last_error?' ('+e.last_error+')':''}`).join(' · ');
    for(const v of [`${r.first_name} ${r.last_name}`,cityName(r.event_id),r.organisation,r.email,r.phone,r.dietary,r.dietary_notes,emails,new Date(r.created_at).toLocaleString('en-AU',{timeZone:'Australia/Brisbane'})]){const td=document.createElement('td');td.textContent=v;tr.append(td);}
    const td=document.createElement('td');
    if(r.cancelled_at)td.textContent='Cancelled';
    else{const btn=document.createElement('button');btn.textContent=preview?'Preview cancellation':'Cancel attendance';btn.type='button';btn.addEventListener('click',()=>cancel(r));td.append(btn);}
    tr.append(td);$('rows').append(tr);
  }
  if(!selected().length){const tr=document.createElement('tr');const td=document.createElement('td');td.colSpan=10;td.textContent='No registrations to show.';tr.append(td);$('rows').append(tr);}
}
async function load(){
  $('admin-status').textContent='';
  try{const response=await fetch(config.apiBase.replace(/\/$/,'')+'/admin/registrations',{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});const data=await response.json();if(!response.ok)throw new Error(data.error || 'Unable to load registrations.');registrations=data.registrations;$('login').hidden=true;$('dashboard').hidden=false;render();}
  catch(error){$('admin-status').textContent=error.message;}
}
async function cancel(r){
  if(!confirm(`Cancel ${r.first_name} ${r.last_name}’s ${cityName(r.event_id)} registration? Queued event emails will be cancelled.`))return;
  if(preview){r.cancelled_at=new Date().toISOString();r.emails=r.emails.map(e=>({...e,status:e.status==='pending'?'cancelled':e.status}));render();return;}
  try{const response=await fetch(config.apiBase.replace(/\/$/,'')+'/admin/registrations/'+r.id,{method:'PATCH',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({cancel:true})});if(!response.ok)throw new Error('Cancellation could not be saved.');await load();}catch(error){$('admin-status').textContent=error.message;}
}
$('login').addEventListener('submit',async(e)=>{e.preventDefault();if(!config?.apiBase){$('admin-status').textContent='The registration service has not been connected yet.';return;}token=$('access-key').value;$('access-key').value='';await load();});
$('city-filter').addEventListener('change',render);
$('refresh').addEventListener('click',()=>preview?render():load());
$('logout').addEventListener('click',()=>{token='';registrations=[];$('dashboard').hidden=true;$('login').hidden=false;$('stats').replaceChildren();$('rows').replaceChildren();if(preview)location.href='./';});
$('export').addEventListener('click',()=>{
  const quote=v=>{let s=String(v??'');if(/^[\s]*[=+\-@]/.test(s)||/^[\t\r\n]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};
  const headings=['Reference','First name','Last name','City','Practice','Email','Mobile','Dietary requirements','Catering notes','Registered (UTC)','Status'];
  const rows=selected().map(r=>[r.id,r.first_name,r.last_name,cityName(r.event_id),r.organisation,r.email,r.phone,r.dietary,r.dietary_notes,r.created_at,r.cancelled_at?'Cancelled':'Attending']);
  const csv='\ufeff'+[headings,...rows].map(row=>row.map(quote).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=(preview?'PREVIEW-':'')+'adviser-connect-attendance.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
async function init(){const response=await fetch('./events.json',{cache:'no-store'});if(!response.ok)throw new Error('Event configuration could not load.');config=await response.json();if(preview){$('demo-banner').hidden=false;$('login').hidden=true;$('dashboard').hidden=false;registrations=[{id:'PREVIEW-001',first_name:'Alex',last_name:'Sample',event_id:'brisbane',organisation:'Example Advice',email:'alex@example.com',phone:'',dietary:'vegetarian',dietary_notes:'',created_at:'2026-10-06T03:00:00Z',cancelled_at:null,emails:[{kind:'confirmation',status:'sent'},{kind:'organiser',status:'sent'},{kind:'reminder',status:'pending'}]},{id:'PREVIEW-002',first_name:'Sam',last_name:'Example',event_id:'brisbane',organisation:'Example Financial',email:'sam@example.com',phone:'',dietary:'gluten-free',dietary_notes:'Coeliac — please avoid cross-contamination.',created_at:'2026-10-06T02:00:00Z',cancelled_at:null,emails:[{kind:'confirmation',status:'sent'},{kind:'organiser',status:'sent'},{kind:'reminder',status:'pending'}]}];render();}}
init().catch(error=>{$('admin-status').textContent=error.message;});
