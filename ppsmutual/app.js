const $ = (id) => document.getElementById(id);
const preview = new URLSearchParams(location.search).get('preview') === '1';
let config, turnstileWidget, turnstileToken = '', selectedCity;
let requestKey = crypto.randomUUID();
function managedUrl(city) {
  if (config.registrationProvider !== 'humanitix' || !city?.registrationUrl) return null;
  try { const url = new URL(city.registrationUrl); return url.protocol === 'https:' && url.hostname === 'events.humanitix.com' ? url.href : null; } catch { return null; }
}
function details(container, city) {
  container.replaceChildren();
  for (const [tag, value] of [['strong', city.name], ['span', city.dateLabel], ['span', city.timeLabel], ['span', city.venue], ['span', city.address], ['span', city.inclusions]]) {
    if (!value) continue;
    const node = document.createElement(tag); node.textContent = value; container.append(node);
  }
}
function setButton() {
  if (!preview && config.registrationProvider === 'humanitix') {
    const ready = config.registrationOpen && managedUrl(selectedCity) && selectedCity?.start && new Date(selectedCity.start) > new Date();
    $('submit-button').disabled = !ready;
    $('submit-button').textContent = ready ? 'Continue to registration →' : 'Registrations opening soon';
    $('form-footnote').textContent = ready ? 'Your delegate details and dietary requirements are collected securely by Humanitix.' : 'Registration will open once the final arrangements are in place.';
    return;
  }
  const ready = preview || (config.registrationOpen && config.apiBase && config.turnstileSiteKey && selectedCity?.start && new Date(selectedCity.start) > new Date());
  $('submit-button').disabled = !ready;
  $('submit-button').textContent = preview ? 'Preview my registration →' : ready ? 'Register for the event →' : selectedCity && !selectedCity.start ? 'Event details coming soon' : 'Registrations opening soon';
  $('form-footnote').textContent = preview ? 'Preview only. Your details will not be saved or emailed.' : ready ? (config.confirmationMode === 'manual' ? 'Your state team will email your confirmation.' : 'We’ll email your confirmation and reminders one week and 48 hours before the event.') : 'The invitation is ready. Registration will open once the final arrangements are in place.';
}
function calendar(city) {
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const stamp = (s) => new Date(s).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ChargeOut//Adviser Connect 2026//EN','BEGIN:VEVENT',`UID:adviser-connect-2026-${city.id}@chargeout.net`,`DTSTAMP:${stamp(new Date())}`,`DTSTART:${stamp(city.start)}`];
  if (city.end) lines.push(`DTEND:${stamp(city.end)}`);
  lines.push(`SUMMARY:${esc(config.title + ' — ' + city.name)}`,`LOCATION:${esc([city.venue, city.address].filter(Boolean).join(', '))}`,`DESCRIPTION:${esc(city.timeLabel + '; PPS Mutual Business & Profit Share Update; Mike Jackson: The Psychology of High Performance; ' + (city.meal === 'breakfast' ? 'Breakfast' : 'Lunch') + ' & Networking')}`,'END:VEVENT','END:VCALENDAR');
  return URL.createObjectURL(new Blob([lines.join('\r\n') + '\r\n'], {type:'text/calendar;charset=utf-8'}));
}
async function setup() {
  const response = await fetch('./events.json', {cache:'no-store'});
  if (!response.ok) throw new Error('Event details could not be loaded. Please refresh the page.');
  config = await response.json();
  $('preview-banner').hidden = !preview;
  for (const city of config.cities) {
    const label = document.createElement('label'); label.className = 'city-option';
    const radio = document.createElement('input'); radio.type='radio'; radio.name='city'; radio.value=city.id; radio.required=true;
    const text = document.createElement('span'); text.textContent=city.name;
    label.append(radio,text); $('city-options').append(label);
    radio.addEventListener('change', () => { selectedCity=city; details($('event-details'), city); $('meal-paragraph').textContent='Following the presentation, join us for '+(city.meal || 'lunch')+' and the opportunity to celebrate the year with the PPS Mutual team and your adviser peers.'; $('meal-highlight').textContent=(city.meal === 'breakfast' ? 'Breakfast' : 'Lunch')+' & Networking'; setButton(); });
  }
  if (!preview && config.registrationProvider === 'humanitix') {
    for (const node of document.querySelectorAll('[data-delegate-fields]')) { node.hidden = true; for (const input of node.querySelectorAll('input,select,textarea')) input.disabled = true; }
  }
  setButton();
  if (!preview && config.registrationProvider !== 'humanitix' && config.registrationOpen && config.apiBase && config.turnstileSiteKey) {
    window.onTurnstileReady = () => { turnstileWidget = window.turnstile.render('#turnstile', {sitekey:config.turnstileSiteKey, callback:(t)=>{turnstileToken=t;}, 'expired-callback':()=>{turnstileToken='';}, 'error-callback':()=>{turnstileToken=''; $('form-status').textContent='The security check could not load. Refresh and try again.';} }); };
    const script = document.createElement('script'); script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileReady&render=explicit'; script.async=true; script.defer=true; document.head.append(script);
  }
}
$('registration-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!selectedCity) return;
  if (!preview && config.registrationProvider === 'humanitix') { const url = managedUrl(selectedCity); if (config.registrationOpen && url && selectedCity.start && new Date(selectedCity.start) > new Date()) location.assign(url); return; }
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  if (!preview && !turnstileToken) { $('form-status').textContent='Please complete the security check before registering.'; return; }
  const data = Object.fromEntries(new FormData(form)); data.consent = data.consent === 'on'; data.turnstileToken=turnstileToken;
  $('submit-button').disabled=true; $('submit-button').textContent='Submitting your registration…'; $('form-status').textContent='';
  try {
    let result;
    if (preview) result={reference:'PREVIEW', event:selectedCity};
    else {
      const response = await fetch(config.apiBase.replace(/\/$/,'') + '/registrations', {method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':requestKey},body:JSON.stringify(data)});
      result=await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not confirm your registration. Please try again.');
    }
    form.hidden=true; $('success').hidden=false;
    const city=result.event || selectedCity;
    $('success-eyebrow').textContent=preview ? 'REGISTRATION PREVIEW' : config.confirmationMode === 'manual' ? 'REGISTRATION RECEIVED' : 'YOU’RE ON THE LIST';
    $('success-title').textContent=config.confirmationMode === 'manual' ? 'Registration received.' : preview ? 'Here’s your confirmation.' : 'We’ll see you there.';
    $('success-message').textContent=config.confirmationMode === 'manual' ? (preview ? `This previews the acknowledgement after submission, ${data.firstName}. Your ${city.name} team would receive your details and email your confirmation separately. No registration has been saved and no email has been sent in this preview.` : `Thanks, ${data.firstName}. Your registration details for ${city.name} have been received. Your state team will email your confirmation separately.`) : preview ? `This is how your confirmation will look, ${data.firstName}. This preview has not registered you or sent an email.` : `Thanks, ${data.firstName}. Your place in ${city.name} is confirmed. Your confirmation email is queued for ${data.email}; we’ll also send reminders one week and 48 hours before the event.`;
    details($('success-details'),city);
    if (city.start && config.confirmationMode !== 'manual') { $('calendar-link').href=calendar(city); $('calendar-link').download=`adviser-connect-${city.id}.ics`; $('calendar-link').hidden=false; }
    $('success-reference').textContent=preview ? 'Preview complete · no registration saved.' : `Registration reference: ${result.reference}. To change your details, contact your state team or ${config.replyTo}.`;
    form.reset(); turnstileToken=''; $('success').focus();
  } catch (error) {
    $('form-status').textContent=error.message || 'We could not confirm your registration. Please try again.';
    turnstileToken=''; if (window.turnstile && turnstileWidget !== undefined) window.turnstile.reset(turnstileWidget); setButton();
  }
});
setup().catch((error)=>{ $('form-status').textContent=error.message; $('submit-button').disabled=true; $('submit-button').textContent='Unable to load event'; });
