# App Store Connect website URLs

Use these URLs after `chargeout.net` is live and each page has been checked publicly.

| App | Marketing URL | Support URL | Privacy Policy URL |
| --- | --- | --- | --- |
| Work Travel Logbook | `https://chargeout.net/apps/work-travel-logbook/` | `https://chargeout.net/apps/work-travel-logbook/support/` | `https://chargeout.net/apps/work-travel-logbook/privacy/` |
| Receipt Rescue | `https://chargeout.net/apps/receipt-rescue/` | `https://chargeout.net/apps/receipt-rescue/support/` | `https://chargeout.net/apps/receipt-rescue/privacy/` |
| Avanti Tracker | `https://chargeout.net/apps/avanti-tracker/` | `https://chargeout.net/apps/avanti-tracker/support/` | `https://chargeout.net/apps/avanti-tracker/privacy/` |
| Note Buddy | `https://chargeout.net/apps/note-buddy/` | `https://chargeout.net/apps/note-buddy/support/` | `https://chargeout.net/apps/note-buddy/privacy/` |

The Marketing URL is optional. The Support URL and Privacy Policy URL are the app-specific public pages intended for the required listing fields.

## Note Buddy listing draft

### Core fields

| Field | Draft |
| --- | --- |
| Name | `Note Buddy` |
| Subtitle | `Private meeting notes` |
| Primary category | Productivity |
| Secondary category | Business |
| Copyright | `2026 ChargeOut` |
| Keywords | `iPhone Duo,foldable,dual screen,notes,handwriting,meetings,action items,reminders,Apple Pencil` |
| Price | Free |
| Platforms | iPhone, iPad and Mac from one universal app record |
| Minimum systems | iOS/iPadOS 26 or later; macOS 26 or later |

### Promotional text

> Handwrite or type on one private page, find action items, and make the most of iPhone Duo with layouts for its outer, inner and laptop-style displays.

### Description

> Note Buddy is a private meeting notebook for iPhone, iPad and Mac.
>
> Made for iPhone Duo: keep notes compact on the outer display, open to a roomy inner-display workspace, or prop it on its side to type with the note above the fold.
>
> Combine handwriting, typed text, photos and files in a note. Everything stays together on one scrolling page in the order you added it.
>
> With optional Calendar access, a new note can take the name, time and attendees of the meeting you are in. On supported devices, Apple Intelligence can summarise the page and find tasks, owners and due dates. Optional Reminders integration turns those tasks into reminders and keeps their completion state in step.
>
> • Handwriting and typing on one page
>
> • Purpose-built iPhone Duo layouts for closed, open and propped use
>
> • Private iCloud sync across iPhone, iPad and Mac
>
> • Meeting-aware titles with optional Calendar access
>
> • On-device handwriting, photo and document text recognition
>
> • On-device summaries and action-item finding on supported devices
>
> • Optional Reminders integration
>
> • Photos, PDFs and files with markup on iPhone and iPad
>
> • Sharing through the system share sheet
>
> Handwriting is editable on iPhone and iPad and view-only on Mac. Apple Intelligence requires compatible hardware and must be enabled; simple marked-task matching remains available without it.
>
> Note Buddy has no ChargeOut account, advertising, analytics or tracking. Your notes sync through your private iCloud database and are not available to ChargeOut. Private Cloud Compute is not enabled in current builds.
>

The release listing should describe the complete three-note trial and unlimited-note upgrade. Verify the purchase is configured, restorable and ready to submit with the version:

> Every feature is included for your first three notes. A one-time AU$6.99 Australian Note Buddy Pro purchase unlocks unlimited notes, with no subscription. Start a line or end a paragraph with a handwritten or typed asterisk to automatically flag a to-do. Apple Intelligence features require a compatible device with Apple Intelligence enabled.

The iPhone Duo wording is deliberately concrete and limited to layouts implemented by the app. Archive the release with Xcode 27.1 or later so the hinge-aware code path is present in the submitted build.

## Planned Note Buddy Pro purchase

Configure this purchase for the release model and verify StoreKit purchase and entitlement restoration before submission.

| Field | Draft |
| --- | --- |
| Type | Non-Consumable |
| Reference name | `Note Buddy Pro` |
| Display name | `Note Buddy Pro` |
| Description | `Unlimited notes. One-time purchase, no subscription.` |
| Proposed product ID | `com.richardhopwood.NoteBuddy.pro` |
| Planned Australian price | AU$6.99 one time |

Product IDs cannot be changed after creation. Confirm the identifier before saving it in App Store Connect.

## Version setup for the freemium release

- App price: **Free**.
- Availability: all countries and regions unless a deliberate launch restriction is chosen.
- Release: **Manually release this version** until the complete iPhone, iPad and Mac submission has been reviewed.
- Sign-in required: **No** on both iOS and macOS.
- Game Center: **No**.
- Content rights: the app does not contain licensed third-party catalogue content.
- Age rating: answer **None** for mature content, gambling, web access, social, messaging, advertising and user-to-user content. Personal notes are not published to other users.
- Configure the non-consumable purchase and submit it with the app version before publishing purchase copy to the App Store listing.

### App Review notes draft

> Note Buddy does not require an account or sign-in. Calendar and Reminders access are optional; core note creation works if either permission is declined. On iPhone and iPad, create a note and use the pencil/keyboard controls to add handwritten and typed sections. Use the sparkle/action-items control to run handwriting recognition and find action items. Apple Intelligence results require supported hardware with Apple Intelligence enabled; otherwise the app uses on-device marked-line matching. On Mac, handwriting is view-only and typed notes remain editable. Notes sync through the user’s private iCloud database. There is no developer-operated backend, analytics, advertising or tracking. Every feature is available for three free notes. Creating a fourth note prompts the one-time Note Buddy Pro upgrade for unlimited notes; purchase and restoration are available in Settings.

App Review contact details still need a phone number supplied by the account holder. Use `info@chargeout.net` for the review email if that inbox is monitored during review.

## App Privacy answers for Note Buddy

Based on the current source and privacy policy:

- Tracking: **No**.
- Data used to track you: **None**.
- Data linked to you and collected by ChargeOut: **None**.
- Data not linked to you and collected by ChargeOut: **None**.
- App Privacy summary: **Data Not Collected**.
- Account creation: **No account**.
- Advertising and third-party analytics: **None**.

The app does transmit user content to Apple CloudKit for private iCloud sync, but ChargeOut does not receive or operate that storage. Calendar and Reminders access are optional Apple-framework integrations. Current AI processing uses Apple’s on-device Foundation Model; Private Cloud Compute is not enabled.

Recheck these answers if analytics, crash-reporting SDKs, a backend, Private Cloud Compute or any other data flow is added before submission.

## Submission blockers and checks

### Required before the freemium listing is submitted

- Verify StoreKit 2 purchase, entitlement checking and **Restore Purchases** in the release build.
- Include all features in the three-note free allowance; gate only creation of further notes. Existing notes remain editable, synced and shareable without Pro.
- Test purchase success, cancellation, pending approval, offline launch, Family Sharing choice and entitlement restoration on a second device.
- Create the non-consumable product, add its App Review screenshot and submit it with the app version.
- Deploy the current SwiftData/CloudKit schema from Development to Production before TestFlight or App Store use.
- Confirm iCloud, push, Calendar, Reminders and camera capabilities in the distribution profile for both iOS/iPadOS and macOS variants.
- Keep the Private Cloud Compute entitlement and compilation flag absent unless Apple approves access and the privacy copy is updated.

### Listing and review material

- Upload screenshots for each device family offered by the universal record. Show a real note, mixed handwriting and typing, the action-items panel, an attachment and the Mac layout without private data.
- Record App Review notes explaining that Calendar and Reminders are optional, where Note Buddy Pro can be purchased and restored, and how reviewers can reach the action-item feature.
- Confirm the age-rating questionnaire reflects a general productivity app with no account, social features, user-to-user sharing or built-in web content.
- Complete export-compliance questions for Apple’s standard iCloud/network encryption and add the appropriate non-exempt-encryption declaration to the app if confirmed by archive validation.
- Archive and validate both destinations, review Xcode’s privacy-manifest warnings and resolve every signing or entitlement warning before upload.
- Test iCloud sync using production/TestFlight accounts, not only development builds.

Keep the old GitHub Pages sites available until the custom domain has HTTPS enabled and every URL above returns successfully. Updating the URLs in App Store Connect does not require changing the source app projects.
