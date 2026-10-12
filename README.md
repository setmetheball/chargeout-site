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

Note Buddy’s public copy reflects the free-with-tips model: all features and unlimited notes are free, with optional consumable beer tips towards development costs. The former three-note allowance and Pro pricing no longer apply. Tips unlock nothing and do not create a subscription. Private CloudKit sync and on-device Apple Intelligence remain unchanged.

## Local preview

Serve the repository root with any static HTTP server and open `/`. Directly opening HTML files is not recommended because root-relative links are intended for `chargeout.net`.

## App pricing and registration preservation

All ChargeOut apps are presented as free to use with every feature included. Optional beer tips help cover development costs where supported by the installed app version. Local App Store pricing is shown before confirmation; no paid tier or note/export allowance should be advertised.

The PPS Mutual registration redirect at `ppsmutual/`, its event assets and the reference service at `services/ppsmutual/` are independent of the app pages. Preserve their files, registration destination and hosting configuration when updating app copy.
