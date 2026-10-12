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

> All features and unlimited notes are free. Handwrite, type and find action items on iPhone, iPad and Mac, with optional beer tips to support development.

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

The release listing should describe free access to every feature and optional support:

> Every feature and unlimited notes are free. If Note Buddy is useful to you, you can shout me a beer, or part of one, to help cover development costs. Tips are optional, unlock nothing and do not create a subscription. Start a line or end a paragraph with a handwritten or typed asterisk to automatically flag a to-do. Apple Intelligence features require a compatible device with Apple Intelligence enabled.

The iPhone Duo wording is deliberately concrete and limited to layouts implemented by the app. Archive the release with Xcode 27.1 or later so the hinge-aware code path is present in the submitted build.

## Optional Note Buddy tip products

Each product is a repeatable consumable tip that unlocks nothing. Match the current app source and confirm localised pricing in App Store Connect. Do not attach the superseded Pro upgrade to the new release.

| Tip | Product ID | Type |
| --- | --- | --- |
| A sip | `com.richardhopwood.NoteBuddy.tip.sip` | Consumable |
| A swig | `com.richardhopwood.NoteBuddy.tip.swig` | Consumable |
| Half a beer | `com.richardhopwood.NoteBuddy.tip.half` | Consumable |
| A beer | `com.richardhopwood.NoteBuddy.tip.beer` | Consumable |

## Version setup for the free-with-tips release

- App price: **Free**.
- Availability: all countries and regions unless a deliberate launch restriction is chosen.
- Release: **Manually release this version** until the complete iPhone, iPad and Mac submission has been reviewed.
- Sign-in required: **No** on both iOS and macOS.
- Game Center: **No**.
- Content rights: the app does not contain licensed third-party catalogue content.
- Age rating: the current app’s release checklist must account for the beer references. Personal notes are not published to other users.
- Configure the optional consumable tips and verify them against the current app project before submitting the app and purchases. This website update does not change App Store Connect.

### App Review notes draft

> Note Buddy does not require an account or sign-in. Calendar and Reminders access are optional; core note creation works if either permission is declined. On iPhone and iPad, create a note and use the pencil/keyboard controls to add handwritten and typed sections. Use the sparkle/action-items control to run handwriting recognition and find action items. Apple Intelligence results require supported hardware with Apple Intelligence enabled; otherwise the app uses on-device marked-line matching. On Mac, handwriting is view-only and typed notes remain editable. Notes sync through the user’s private iCloud database. There is no developer-operated backend, analytics, advertising or tracking. All features and unlimited notes are free. Settings → Tip Jar → Buy Me a Beer offers optional consumable tips towards development costs. A tip unlocks nothing, and cancelled, pending or failed purchases never limit app access.

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

### Required before the free-with-tips listing is submitted

- Verify optional StoreKit 2 consumable tips in the release build. Tips have no feature entitlement or balance to restore.
- Confirm unlimited note creation and every feature remain available without tipping, including when the App Store is unavailable.
- Test repeat tips, cancellation, pending approval, interrupted transactions and offline app access. Verify supporter acknowledgements across devices.
- Configure the four consumable products, add the tip-jar review screenshot and prepare them with the app version.
- Deploy the current SwiftData/CloudKit schema from Development to Production before TestFlight or App Store use.
- Confirm iCloud, push, Calendar, Reminders and camera capabilities in the distribution profile for both iOS/iPadOS and macOS variants.
- Keep the Private Cloud Compute entitlement and compilation flag absent unless Apple approves access and the privacy copy is updated.

### Listing and review material

- Upload screenshots for each device family offered by the universal record. Show a real note, mixed handwriting and typing, the action-items panel, an attachment and the Mac layout without private data.
- Record App Review notes explaining that Calendar and Reminders are optional, where the optional tip jar can be found, and how reviewers can reach the action-item feature.
- Confirm the age-rating questionnaire reflects the current app, including the beer-tip references, with no account, social features, user-to-user sharing or built-in web content.
- Complete export-compliance questions for Apple’s standard iCloud/network encryption and add the appropriate non-exempt-encryption declaration to the app if confirmed by archive validation.
- Archive and validate both destinations, review Xcode’s privacy-manifest warnings and resolve every signing or entitlement warning before upload.
- Test iCloud sync using production/TestFlight accounts, not only development builds.

Keep the old GitHub Pages sites available until the custom domain has HTTPS enabled and every URL above returns successfully. Updating the URLs in App Store Connect does not require changing the source app projects.
