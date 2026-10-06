# ChargeOut website

Static website for ChargeOut and the public marketing, support and privacy pages for Work Travel Logbook, Receipt Rescue, Avanti Tracker and Note Buddy.

## Publishing

The site is designed for GitHub Pages at `https://chargeout.net` and needs no build step, package manager, remote font, analytics or third-party runtime.

1. Publish the repository's `main` branch from the repository root in **Settings → Pages**.
2. Set the custom domain to `chargeout.net`. The tracked `CNAME` file preserves that domain in deployments.
3. Configure the domain's DNS using the current values shown in GitHub Pages, then enable **Enforce HTTPS** after GitHub provisions the certificate.
4. Check the homepage and all URLs in `APP_STORE_CONNECT.md` before replacing the old listing URLs.

## App assets

The four 1024 × 1024 PNG files in `assets/icons` are local copies of the current app icons from the source Xcode projects. The website has no runtime dependency on those projects. `assets/data/apps.json` is the compact app manifest to update when another ChargeOut app is added.

Note Buddy’s public copy reflects the current app source: private CloudKit sync, optional Calendar and Reminders access, on-device handwriting and attachment recognition, and on-device Apple Intelligence. Private Cloud Compute is not enabled. The site presents Note Buddy to iPhone Duo owners. The release model includes every feature for three free notes, followed by a one-time AU$6.99 Australian Pro upgrade for unlimited notes. Starting a line or ending a paragraph with a handwritten or typed asterisk automatically flags a to-do. The website describes App Store release pricing without claiming the app is already available to purchase.

## Local preview

Serve the repository root with any static HTTP server and open `/`. Directly opening HTML files is not recommended because root-relative links are intended for `chargeout.net`.
