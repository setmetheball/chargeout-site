const legalPages = {
  'work-travel-logbook': {
    name: 'Work Travel Logbook',
    icon: '/assets/icons/work-travel-logbook.png',
    privacyDate: '8 July 2026',
    privacy: [
      ['1. Overview', '<strong>Work Travel Logbook does not collect personal information from users. Travel log entries are stored locally on the user’s device. The developer does not receive, store, sell or share user data.</strong><p>This policy explains how Work Travel Logbook handles information when you use the app.</p>'],
      ['2. Information stored by the app', 'The app stores travel log entries locally on the user’s device. These entries may include dates, times, odometer readings, reasons for travel, kilometres travelled, reimbursement rates and calculated reimbursement amounts.'],
      ['3. Information collected by the developer', 'The developer does not collect personal information through the app. The app does not use analytics, advertising or tracking technologies.'],
      ['4. Data sharing', 'The app does not send travel data to a server. The developer does not receive, store, sell or share user data.'],
      ['5. CSV exports', 'The user may manually export a CSV file using the iOS share sheet. Any exported CSV is shared only when the user chooses a destination. The developer does not receive a copy of exported CSV files.'],
      ['6. Internet access', 'Work Travel Logbook is designed to work offline. The app does not require internet access to record trips, calculate totals or create CSV exports.'],
      ['7. Account creation', 'The app does not require login and does not require users to create an account.'],
      ['8. Data deletion', 'Deleting the app removes locally stored app data, subject to normal iOS backup and restore behaviour. Users should export any CSV files they wish to keep before deleting the app.'],
      ['9. Contact', 'For privacy questions, email <a href="mailto:info@chargeout.net">info@chargeout.net</a>.']
    ],
    support: [
      ['About the app', 'Work Travel Logbook is a simple iPhone app for recording work-related trips, odometer readings, kilometres travelled and monthly reimbursement totals.'],
      ['Create a new entry', 'Tap <strong>Start Trip</strong>. Enter the starting odometer reading, reason for travel and reimbursement rate. The trip remains active until you finish it.'],
      ['End a trip', 'Tap <strong>Finish Trip</strong> and enter the end odometer reading. The app calculates kilometres travelled and the mileage claim, then saves the completed trip.'],
      ['Export a monthly CSV', 'Select the month you want to export, then tap <strong>Export Monthly CSV</strong>. At least one completed trip is required. The app creates a local CSV and opens the iOS share sheet.'],
      ['Change the reimbursement rate', 'Set the appropriate rate when starting a trip. The rate saved with the trip is used for that trip’s mileage claim calculation.'],
      ['Edit or delete entries', 'To delete a completed entry, swipe left on the trip and choose delete. If editing is available in your installed version, open the trip to update its details.'],
      ['Troubleshooting', '<h3>Incorrect reimbursement total</h3><p>Check the start and end odometer readings and the rate saved with the trip.</p><h3>Missing entries</h3><p>Check the selected month. A trip appears in monthly totals after it is finished.</p><h3>Reinstalling the app</h3><p>Work Travel Logbook stores data locally. Export important CSV files before deleting or reinstalling the app.</p>'],
      ['Contact', 'For support, email <a href="mailto:info@chargeout.net?subject=Work%20Travel%20Logbook%20support">info@chargeout.net</a>.']
    ]
  },
  'receipt-rescue': {
    "name": "Receipt Rescue",
    "icon": "/assets/icons/receipt-rescue.png",
    "privacyDate": "1 October 2026",
    "privacy": [
        [
            "1. Overview",
            "Receipt Rescue stores and processes receipt records on your iPhone. ChargeOut does not receive your saved receipt images, recognised text, tags or expense reports. The app has no ChargeOut account, advertising or developer analytics. This policy explains local storage, receipt-link imports, sharing, backups and optional purchases."
        ],
        [
            "2. Information stored by the app",
            "The app stores receipt images, recognised text, dates, biller or merchant names, expense reasons, built-in and custom tags, scan timestamps, optional user-confirmed AUD amounts, thumbnails and monthly PDF files. It also stores whether your free PDF export has completed. Reports for a month, quarter, calendar year, Australian tax year or custom date range are generated on your device. App settings and custom tags are stored locally; a shared inbox passes imported receipts from the share extension to the main app on the same iPhone."
        ],
        [
            "3. Camera and text recognition",
            "Camera access is used only when you choose to scan a receipt. Apple’s document scanner captures receipt pages and Apple Vision recognises text on the device to suggest the date, biller and an explicit AUD receipt total when one can be identified. You check and correct suggestions before saving; ambiguous or explicitly foreign-currency totals are not suggested. Recognition does not require Apple Intelligence or a cloud AI service. Receipt Rescue does not upload your camera scans or recognised text to ChargeOut."
        ],
        [
            "4. Importing digital receipts and internet access",
            "You can share supported PDFs, images and receipt links to Receipt Rescue. Importing a file is processed locally. Importing a web link connects to the original receipt website to download or render the receipt, and the webpage may contact other services used by that website. Those services may receive the requested URL, IP address and normal web request information under their own privacy policies. Receipt Rescue uses temporary web sessions rather than its own persistent browsing history. It does not send your other saved receipts or tags to that website. Scanning, editing, storing and generating reports from saved receipts work offline; web-link imports require a connection."
        ],
        [
            "5. Sharing receipt reports",
            "You choose when to share a PDF and select the recipient or destination through the iOS share sheet. Shared reports contain receipt images and may include dates, merchants, expense reasons, tags and recorded AUD totals. A summary identifies missing amounts and overlapping tags. ChargeOut does not receive a copy unless you choose to send one to us. The destination you choose, including an email provider or cloud-storage service, has its own privacy practices. You can remove exported copies from those destinations using their controls."
        ],
        [
            "6. iPhone backups and iCloud",
            "Saved app data may be included in normal iPhone backups, including iCloud Backup if you enable it and include Receipt Rescue. Apple manages those backups using your Apple Account and device settings; ChargeOut cannot access them. Receipt Rescue does not provide live iCloud sync between devices or an in-app backup-and-restore service. Backup completion and restoration depend on your settings, available space and Apple’s backup process. Keep separate copies of important PDFs before deleting the app or changing devices."
        ],
        [
            "7. Storage, retention and deletion",
            "Receipt Rescue is designed to keep a rolling seven years of receipts, subject to available device storage. It does not automatically remove receipts when they reach seven years. You can delete individual receipts, entire months, or confirm removal of receipts older than the seven-year cutoff in Settings → Manage Storage. These actions remove the selected local records and update affected monthly PDFs. The app checks available device storage to warn about low space and displays storage information to you; that information is not sent to ChargeOut. Deleting the app removes its local data, subject to normal iOS backup and restore behaviour. Deleting local records does not automatically erase exported copies or earlier device backups; manage those through the relevant destination or Apple settings."
        ],
        [
            "8. Optional Pro export purchases",
            "If your installed version offers a Pro export upgrade, payment is handled by Apple through the App Store. Apple’s privacy policy and purchase terms apply. ChargeOut does not receive your payment-card details. The app may use Apple’s purchase status and transaction information to verify access and restore the upgrade; receipt contents are not needed to make a purchase. In versions offering Pro Exports, one completed PDF export is free, and a local setting records when it is used. Cancelling or a failed share does not consume it. Scanning, importing, tagging, editing and previews remain free. Pro unlocks unlimited monthly and custom PDF exports with a one-time purchase. Its localized App Store price is shown before you buy. Restore Purchases verifies the upgrade with the same Apple Account. No custom Pro purchase service is offered by ChargeOut."
        ],
        [
            "9. Support requests",
            "If you email ChargeOut, we receive your email address, message and any files you choose to attach so we can respond. Include only the information needed to explain the issue; avoid sending sensitive receipt details unless necessary. Support correspondence is kept only as needed to handle the request and applicable record-keeping obligations. You can ask about deletion by contacting us."
        ],
        [
            "10. Website hosting",
            "These pages are hosted on GitHub Pages. GitHub may process normal website request information under its privacy policy. Opening a support or privacy link in the app uses your browser. The website does not receive your saved receipt library from Receipt Rescue. These pages do not include ChargeOut advertising or analytics."
        ],
        [
            "11. Changes and contact",
            "We may update this policy when the app or its data practices change. The effective date identifies the current version. For privacy questions or requests about information you sent to support, email <a href=\"mailto:info@chargeout.net\">info@chargeout.net</a>."
        ]
    ],
    "support": [
        [
            "About Receipt Rescue",
            "Receipt Rescue is an iPhone app for collecting expense receipts, organising them with tags and creating PDF reports to help prepare your taxes or reimbursement claims. It does not provide tax, accounting or financial advice and does not decide whether an expense is deductible. It requires iOS 26 or later. Apple Intelligence is not required."
        ],
        [
            "Scan and check a receipt",
            "Tap <strong>Scan a Receipt</strong>, allow camera access and position the receipt in the document scanner. Add more pages if needed. Check the suggested date, biller and receipt amount, enter the expense reason, choose any tags and save. Amounts are optional and explicitly in AUD; they are not currency conversions. Correct any suggested amount yourself, or leave it blank if unknown. Use a minus sign for a refund. The biller and expense reason are required. Text recognition happens on your iPhone; correct faded, handwritten or unusual receipts manually."
        ],
        [
            "Import a digital receipt",
            "In Safari, Files or another compatible app, open the iOS share sheet and choose <strong>Receipt Rescue</strong>. You may need to enable it under More. Share a supported PDF, image or receipt link, check the details and save, then open Receipt Rescue to import the saved item. Receipt links need an internet connection and contact the original website. If a link requires a login or does not render correctly, download its PDF or image and share that file instead."
        ],
        [
            "Use built-in and custom tags",
            "Choose any of <strong>Personal, Work, Car and Property</strong>, or tap <strong>New Custom Tag</strong> to create your own. A receipt can have several tags. Open a saved receipt and choose <strong>Edit Details</strong> to change its tags, date, biller, expense reason or recorded AUD amount. <strong>Settings → Manage Tags</strong> lets you add or remove custom tags. Removing a custom tag from the catalogue does not remove it from receipts already using it."
        ],
        [
            "Create a report",
            "Tap <strong>Create an Expense Report</strong> on the home screen. Choose a month, quarter, calendar year, Australian tax year or custom date range. Australian tax years run from 1 July to 30 June. Select one or more tags and choose whether receipts must match any or all selected tags. With no tags selected, both tagged and untagged receipts are included. At least one matching receipt is needed. Tap <strong>Create PDF Report</strong> to preview the report, then use <strong>Export PDF</strong> to choose a destination. Reports begin with recorded AUD totals by tag, receipt counts and missing-amount counts, followed by the saved receipt images. A receipt with several tags appears in each tag total; the overall total counts it once. Missing amounts are excluded, so the recorded total may be incomplete. Reports do not determine tax deductions or provide tax advice."
        ],
        [
            "Preview and share a monthly PDF",
            "Open the current month or use <strong>Previous Months</strong>. Receipt Rescue maintains the monthly PDF in date order. Tap <strong>Export PDF</strong> to choose a destination. New versions include the same recorded-amount summary at the front of monthly PDFs. Existing receipts with no entered amount are flagged rather than treated as known zero-value expenses. Archiving a month keeps its receipt records on the device. PDFs shared outside the app are independent copies; later edits in Receipt Rescue do not update those copies."
        ],
        [
            "Pro export upgrades",
            "In versions offering <strong>Pro Exports</strong>, scanning, importing, storing, tags, editing and PDF previews are free. One completed PDF export is free so you can try the report; cancellation or a failed share does not use it. After that, a one-time Pro purchase unlocks unlimited monthly and custom PDF exports, with no subscription. The purchase screen shows your localized App Store price before purchase. Open <strong>Settings → Pro Exports &amp; Restore Purchases</strong>, or choose Export PDF. To restore an upgrade, use <strong>Restore Purchases</strong> with the Apple Account used to buy it. Purchases and restores may need an internet connection. If Pro is temporarily unavailable, your saved receipts and previews remain accessible. Contact us if a purchased upgrade is not recognised. Do not send payment-card details."
        ],
        [
            "Seven-year storage and deletion",
            "Receipt Rescue is designed to keep a rolling seven years of receipts, subject to available iPhone storage. There is no fixed 300 MB app limit. Open <strong>Settings → Manage Storage</strong> to review storage and older months. The app warns when device storage is low and can stop new scans when space is very low. Receipts older than seven years are removed only after you confirm. Individual receipts and entire months can also be deleted. Deletion is permanent in the app, so save any records you need first."
        ],
        [
            "Backups and moving to another iPhone",
            "Saved receipt data is eligible for normal iPhone backups. If you use iCloud Backup, check in iPhone Settings that backups are enabled, Receipt Rescue is included and a recent backup completed. Receipt Rescue does not provide live sync or an in-app restore service. Restoring a device backup may restore app data, depending on the backup and Apple’s process. A PDF export is useful for keeping readable records but is not a file you can use to restore the app’s library, edits and tags. Keep separate copies of important reports before deleting the app, resetting your iPhone or changing devices."
        ],
        [
            "Troubleshooting",
            "<h3>The scanner is unavailable</h3><p>Check camera permission in iPhone Settings. Document scanning requires a physical iPhone with a working camera.</p><h3>A report contains no receipts</h3><p>Check the receipt dates, reporting period and selected tags. Matching all selected tags is more restrictive than matching any.</p><h3>A shared receipt has not appeared</h3><p>Open Receipt Rescue after saving through the share extension. If the import needs attention, share the original file or link again.</p><h3>A PDF needs rebuilding</h3><p>Keep the app open and reopen the month. If Rebuild PDF is offered, use it. Keep the original scans until you have checked the resulting report.</p><h3>Storage is low</h3><p>Free space on your iPhone or share and remove records you no longer need. Check your backup before deleting important records.</p>"
        ],
        [
            "Privacy and contact",
            "Read the <a href=\"../privacy/\">Receipt Rescue Privacy Policy</a>. For help, email <a href=\"mailto:info@chargeout.net?subject=Receipt%20Rescue%20support\">info@chargeout.net</a> with your app version, iOS version and the steps that led to the issue. Remove sensitive details from screenshots or receipts before sending them."
        ]
    ]
},
  'avanti-tracker': {
    name: 'Avanti Tracker',
    icon: '/assets/icons/avanti-tracker.png',
    privacyDate: '17 August 2026',
    privacy: [
      ['1. Overview', '<strong>Avanti Tracker does not collect personal information from users. Project and time records are stored locally on the user’s device. The developer does not receive, store, sell or share this data.</strong>'],
      ['2. Information stored by the app', 'The app stores project names, project colours and tracking-session start times, end times and durations in local app data. It also stores a temporary local timestamp when Stop Tracking is chosen from a notification.'],
      ['3. Information collected by the developer', 'The developer does not collect information through the app. Avanti Tracker does not use accounts, analytics, advertising, tracking technologies, a remote database or third-party runtime services.'],
      ['4. Notifications', 'With permission, Avanti Tracker schedules optional local notifications while a timer is running. A notification may display the project name. Notification content is not sent to the developer.'],
      ['5. PDF and CSV exports', 'The app creates report files locally. An export leaves the app only when the user chooses a destination through the iOS share sheet. The developer does not receive a copy.'],
      ['6. Live Activities', 'While a timer is running, Avanti Tracker may show the project name, elapsed time and status in an on-device Live Activity, including the Lock Screen and Dynamic Island. This is processed by iOS on the device.'],
      ['7. Internet access', 'The core app works offline. Internet access is not required to track time, review history or generate reports.'],
      ['8. Data deletion', 'Users can delete sessions and projects inside the app. Deleting the app removes local app data, subject to normal iOS backup and restore behaviour. Export records you wish to keep first.'],
      ['9. Contact', 'For privacy questions, email <a href="mailto:info@chargeout.net">info@chargeout.net</a>.']
    ],
    support: [
      ['Start and stop tracking', 'Tap <strong>Track a Project</strong>, choose or create a project, then start tracking. When finished, tap the red <strong>Stop Tracking</strong> button beneath the timer.'],
      ['90-minute reminders', 'After tracking begins, you can allow optional notifications. Choose <strong>Continue</strong> to keep tracking and schedule another check-in, or <strong>Stop Tracking</strong> to end the session.'],
      ['Live Activity and Dynamic Island', 'While a project is active, the elapsed time appears in the Dynamic Island on a compatible iPhone and on the Lock Screen. Tap it to return to the timer.'],
      ['Review and edit history', 'Open <strong>History</strong>, then select a project. Project actions let you rename, recolour or delete a project, and individual sessions can be edited or deleted.'],
      ['Export a report', 'Open <strong>Export</strong>, choose a reporting period and projects, then select PDF or CSV. At least one completed matching session is required.'],
      ['Troubleshooting', '<h3>The timer was interrupted</h3><p>Reopen Avanti Tracker. It derives elapsed time from the saved start time and should recover automatically.</p><h3>A reminder did not appear</h3><p>Check notification permission. Focus, summaries, Low Power Mode and iOS scheduling may delay delivery; the timer is unaffected.</p><h3>The Live Activity does not appear</h3><p>Confirm Live Activities are allowed. Dynamic Island requires a compatible iPhone; other supported iPhones can use the Lock Screen.</p><h3>An export is empty</h3><p>Confirm a completed session matches the selected dates and project filter.</p>'],
      ['Contact', 'For support, email <a href="mailto:info@chargeout.net?subject=Avanti%20Tracker%20support">info@chargeout.net</a>.']
    ]
  }
};

if (typeof module !== 'undefined') module.exports = legalPages;

if (typeof document !== 'undefined') {
const host = document.querySelector('[data-legal-page]');
if (host) {
  const app = legalPages[host.dataset.app];
  const kind = host.dataset.legalPage;
  const title = kind === 'privacy' ? `Privacy Policy for ${app.name}` : `Support for ${app.name}`;
  const sections = app[kind].map(([heading, body]) => {
    const content = /<(?:h[1-6]|p)\b/.test(body) ? body : `<p>${body}</p>`;
    return `<section><h2>${heading}</h2>${content}</section>`;
  }).join('');
  document.title = `${title} | ChargeOut`;
  host.innerHTML = `<h1>${title}</h1>${kind === 'privacy' ? `<p class="effective-date">Effective date: ${app.privacyDate}</p>` : '<p class="effective-date">ChargeOut app support</p>'}${sections}`;
  const asideIcon = document.querySelector('[data-app-icon]');
  const asideName = document.querySelector('[data-app-name]');
  if (asideIcon) { asideIcon.src = app.icon; asideIcon.alt = `${app.name} app icon`; }
  if (asideName) asideName.textContent = app.name;
}
}
