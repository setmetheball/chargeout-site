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
    name: 'Receipt Rescue',
    icon: '/assets/icons/receipt-rescue.png',
    privacyDate: '17 July 2026',
    privacy: [
      ['1. Overview', '<strong>Receipt Rescue does not collect personal information from users. Receipt images, recognised text, expense details and generated PDFs are processed and stored locally on the user’s iPhone. The developer does not receive, store, sell or share this information.</strong>'],
      ['2. Information stored by the app', 'Receipt Rescue may store receipt images, text recognised from those images, receipt dates, biller or merchant names, expense reasons, scan timestamps, storage information and monthly PDF files. This information remains in local app storage.'],
      ['3. Camera and document scanning', 'Camera access is used only when the user chooses to scan a receipt. Apple’s document scanner captures and corrects receipt pages. The app does not upload camera images to the developer or an external service.'],
      ['4. On-device text recognition', 'Receipt Rescue uses Apple Vision to recognise text and suggest a receipt date and biller. Recognition occurs on the device and does not require Apple Intelligence or a cloud AI service.'],
      ['5. Information collected by the developer', 'The developer does not collect information through the app. Receipt Rescue does not use analytics, advertising, tracking technologies, third-party SDKs, user accounts or a cloud database.'],
      ['6. Sharing PDFs', 'Users may manually share a monthly PDF using the iOS share sheet. Sharing occurs only after the user chooses a destination. The developer does not receive a copy.'],
      ['7. Internet access', 'Receipt Rescue is designed to work offline and does not require internet access to scan, recognise, organise, edit, store or generate PDFs from receipts.'],
      ['8. Data retention and deletion', 'Users can delete individual receipts or entire months. Deleting the app removes locally stored app data, subject to normal iOS backup and restore behaviour. Share or save PDFs you wish to keep first.'],
      ['9. Website hosting', 'The Receipt Rescue privacy and support pages are hosted using GitHub Pages. GitHub may process routine web request information. This is separate from the app, which does not send receipt data to the website or GitHub.'],
      ['10. Changes to this policy', 'This policy may be updated if Receipt Rescue’s features or data practices change. The effective date identifies the current version.'],
      ['11. Contact', 'For privacy questions, email <a href="mailto:info@chargeout.net">info@chargeout.net</a>.']
    ],
    support: [
      ['About Receipt Rescue', 'Receipt Rescue scans reimbursement receipts, lets you check the date and biller, records the expense reason, and shares each month as one PDF.'],
      ['Scan a receipt', 'Tap <strong>Scan a Receipt</strong>, allow camera access and position the receipt in the document scanner. Add more pages if needed, then save the scan.'],
      ['Check OCR suggestions', 'On-device text recognition suggests the receipt date and biller. Tap either field to correct it before saving, or use <strong>Edit Details</strong> later.'],
      ['Add the expense reason', 'Enter a short explanation such as “Client lunch” or “Parking for meeting”. The biller and expense reason are required before saving.'],
      ['Preview and share a monthly PDF', 'Open a month from the home screen or <strong>Previous Months</strong>. Tap <strong>Share PDF</strong> and choose a destination in the iOS share sheet.'],
      ['Delete receipts or months', 'Open a receipt and choose <strong>Delete Receipt</strong>. Remove a month from its menu or <strong>Manage Storage</strong>. Deletion is permanent, so share any PDF you need first.'],
      ['Storage', 'Receipt Rescue manages up to 300 MB of scans and PDFs. Open <strong>Settings → Manage Storage</strong> to review usage and remove material you no longer need.'],
      ['Troubleshooting', '<h3>The scanner is unavailable</h3><p>Confirm camera permission in iPhone Settings. Document scanning requires a physical iPhone.</p><h3>The date or biller is incorrect</h3><p>Faded, handwritten, damaged or unusual receipts may need correction.</p><h3>Moving to another iPhone</h3><p>Receipt Rescue has no cloud sync. Share important monthly PDFs before deleting the app, resetting the iPhone or moving devices.</p>'],
      ['Contact', 'For support, email <a href="mailto:info@chargeout.net?subject=Receipt%20Rescue%20support">info@chargeout.net</a>.']
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
  document.title = `${title} — ChargeOut Labs`;
  host.innerHTML = `<h1>${title}</h1>${kind === 'privacy' ? `<p class="effective-date">Effective date: ${app.privacyDate}</p>` : '<p class="effective-date">ChargeOut Labs app support</p>'}${sections}`;
  const asideIcon = document.querySelector('[data-app-icon]');
  const asideName = document.querySelector('[data-app-name]');
  if (asideIcon) { asideIcon.src = app.icon; asideIcon.alt = `${app.name} app icon`; }
  if (asideName) asideName.textContent = app.name;
}
}
