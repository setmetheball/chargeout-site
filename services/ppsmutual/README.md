# Adviser Connect 2026 registration service

The invitation lives at `/ppsmutual/` in the existing ChargeOut GitHub Pages site. A Cloudflare Worker stores registrations in D1 and sends email through Resend. Hover continues receiving and forwarding `info@chargeout.net`; the new sender does not replace its MX records.

## Current state

- The invitation uses the supplied approved RTF wording verbatim, substituting only the city placeholder and confirmed logistics. The branded invitation, city selection, delegate form, dietary fields, confirmation screen, calendar download and organiser dashboard are implemented.
- Brisbane: Friday 13 November 2026, 12:15 pm, Port Office Hotel, Edward Street, Brisbane. End time has not been supplied; the calendar entry contains the start time only.
- Melbourne and Perth are awaiting date, time and venue details. They cannot accept live registrations until a future start time is supplied.
- Live registration defaults to **closed** on both the page and backend. Preview mode never stores registrations or sends emails.
- Alerts are routed by city using privately configured state contacts. The supplied named recipients are kept in ignored local configuration and must be entered as the `ORGANISER_EMAILS` runtime secret; they are never published with the site source. Confirmations, reminders and replies use `info@chargeout.net`, which Hover forwards to the owner’s iCloud inbox. No Microsoft 365 access is needed.
- No Cloudflare database, sending credentials or domain verification have been configured by this code. No emails have been sent.

## Preview

Serve the repository root with a local static server. Open `/ppsmutual/?preview=1` to try the complete delegate flow, and `/ppsmutual/admin.html?preview=1` for a dashboard with explicitly fictional data. Preview is only a presentation mode; it cannot call the registration API. The normal public page honestly says registration is not open.

## Simpler launch option: Humanitix

The owner has asked about avoiding separate hosting and email accounts. Humanitix is the recommended managed alternative; no Humanitix account or events have been created yet, and the owner has not selected this option yet.

Create one free host account and three private, free-ticket events, one for each city. Use the supplied RTF wording unchanged, replacing only city and confirmed logistics. Collect first name, last name, email, practice/organisation, optional mobile and dietary requirements/allergy notes. Set a maximum of one registration per order if individual adviser registration is desired. Configure new-order notification recipients on each event to the privately supplied state addresses. Review owner notifications as well, because adding a state recipient does not automatically remove the account owner. Schedule a reminder campaign 24 hours before each event; Brisbane’s would be Thursday 12 November at 12:15 pm Brisbane time. Confirmations and reminder emails are sent by Humanitix, and reminder reply-to can be the selected state contact or `info@chargeout.net`.

Copy each actual event link into its `registrationUrl` in `ppsmutual/events.json`; set `registrationProvider` to `humanitix` and `registrationOpen` to true once each event is tested. Unconfigured cities remain closed. The page then shows the city choice and a “Continue to registration” button; the delegate details are collected by Humanitix, so there is no duplicate form to complete. No Worker, Resend, DNS changes or M365 access are needed for this mode. Update `ppsmutual/privacy.html` to describe Humanitix instead of the custom Cloudflare/Resend service before opening this mode. The `?preview=1` route remains a deliberately simulated demonstration of the original custom form.

Reference: [free event pricing](https://humanitix.com/au/pricing), [checkout questions](https://help.humanitix.com/en/articles/8950849-collect-attendee-information-with-checkout-questions), [state notification recipients](https://help.humanitix.com/en/articles/11132357-get-notified-via-email-when-a-new-ticket-is-purchased), [scheduled reminder campaigns](https://help.humanitix.com/en/articles/8888873-contact-your-guests-using-the-email-campaign-tool).

## Connect the custom live service

From this directory, with Node 22 or newer:

1. Install Wrangler with `pnpm install`, then authenticate using `npx wrangler login`.
2. Run `npx wrangler d1 create ppsmutual-registration` and copy its real database ID into `wrangler.jsonc`.
3. Run `npx wrangler d1 migrations apply ppsmutual-registration --remote`.
4. In Resend, verify `chargeout.net` as a sending domain. Add only its required sending DNS records, keeping Hover's existing inbound MX records. If an SPF record already exists at the same hostname, combine the authorised senders instead of creating a second SPF record. Verify that the sending provider accepts `info@chargeout.net`.
5. Create a Cloudflare Turnstile widget for `chargeout.net` and `www.chargeout.net`.
6. Set the secrets using Wrangler's interactive stdin prompts, never in source or a public config:

   ```sh
   npx wrangler secret put ORGANISER_EMAILS
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put TURNSTILE_SECRET
   npx wrangler secret put ADMIN_TOKEN
   ```

   `ORGANISER_EMAILS` is a JSON object with `brisbane`, `perth` and `melbourne` keys and the privately supplied recipient addresses.

   `ADMIN_TOKEN` must be a unique random secret of at least 32 characters. Keep it in a password manager. The dashboard uses the key in memory only and never stores it in a URL or browser storage.
7. Run `pnpm test`, then `npx wrangler deploy` with `REGISTRATION_OPEN` still false. Record the returned Worker URL.
8. Update `../../ppsmutual/events.json`: set `apiBase` to that HTTPS Worker URL and `turnstileSiteKey` to the public widget key. Add the pending cities when confirmed, using ISO timestamps with explicit local offsets (Melbourne's November daylight saving offset is `+11:00`, Brisbane `+10:00`, Perth `+08:00`). Redeploy the Worker after event edits because it bundles the same configuration.
9. Verify a test confirmation and alert to the organiser's own inbox before inviting delegates. Temporarily open both registration flags for the test, register with an organiser-controlled address, check the protected dashboard and Resend delivery logs, then cancel that test registration. Check the scheduled handler against a separate test database with a near-future event before relying on the reminder.
10. Set `registrationOpen` true in the page and `REGISTRATION_OPEN` to `"true"` in Wrangler and redeploy. Only configured future cities will accept registrations. Publish the page additions to GitHub Pages.

Delegate link: `https://chargeout.net/ppsmutual/`.
Organiser dashboard: `https://chargeout.net/ppsmutual/admin.html`.
The invitation includes `noindex`; anyone with its URL can still view it. It is not an authenticated private site. Attendee records require the organiser key.

## Behaviour

The API validates every field, requires event consent, verifies Turnstile server-side, checks allowed origins and throttles repeated attempts. It stores the registration and all three email jobs in one database transaction before returning success. Retries with the same request key return the original confirmation without creating duplicate jobs. A repeated email/city combination is rejected with instructions to contact the organiser.

Confirmation and the city-specific organiser-alert jobs are due immediately. A reminder is due 24 hours before the configured city start; registrations within that window queue the reminder immediately. A cron trigger checks due jobs every five minutes. Failed temporary deliveries retry with backoff, using stable Resend idempotency keys and leased jobs to avoid overlapping sends. Retries stop after 23 hours to stay within the provider's 24-hour deduplication window; permanent failures are visible in the dashboard for manual review. “Sent” means accepted by Resend, not proven delivery to the inbox. Consult provider delivery logs for bounces.

The dashboard shows attendance counts, details, dietary notes and email status, exports a CSV with spreadsheet formula escaping, and lets the organiser cancel attendance. Cancellation suppresses queued emails; a message already in flight may still arrive. Changes to a delegate's details are handled by replying to the event email and updating the record through D1; do not share the organiser key with delegates. Event details are snapshotted into queued emails at registration: if a venue or time changes after registrations open, update pending email payloads or contact existing attendees as well as editing `events.json`.

The service stores attendee data only in D1. Never put registration exports, real attendee records, API keys or `.dev.vars` in the public GitHub repository. After the event, the organiser can remove unneeded event records and exports according to their event-data requirements.

## Reference documentation

- [Cloudflare D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/)
- [Cloudflare Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)
- [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Resend sending domains](https://resend.com/docs/dashboard/domains/introduction)
- [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys)
