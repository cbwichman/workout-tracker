# PulseSheet — iOS Workout & Apple Watch Logger

A fast, local-first workout tracking Progressive Web App designed specifically for iOS Safari with an Apple Watch Heart Rate bridge and optional Google Sheets backup.

---

## 🚀 How to Run & Deploy (Get it on your iPhone)

### Step 1: Deploy with GitHub Pages (Zero Config)
1. Push this repository to GitHub:
   ```bash
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages** (under "Code and automation").
   - Under **Build and deployment**:
     - **Source**: Deploy from a branch
     - **Branch**: `main` / `/ (root)`
     - Click **Save**.
3. In 1–2 minutes, your app is live at:
   `https://cbwichman.github.io/workout-tracker/`

---

### Step 2: Install to your iPhone Home Screen
1. Open your GitHub Pages URL in **Safari** on your iPhone.
2. Tap the **Share** button (box with upward arrow) at the bottom toolbar.
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add** in the top right.
5. **Always launch PulseSheet from your home screen icon.** This activates standalone display mode (no browser address bars) and preserves offline local storage.

---

## ☁️ Optional: Connect Google Sheets Serverless Backend

PulseSheet works completely offline with `localStorage`. To automatically sync your sessions to Google Sheets:

1. Create a new Google Spreadsheet at [sheets.new](https://sheets.new).
2. Open **Extensions** → **Apps Script**.
3. In PulseSheet, tap the **Sheets & Watch** button in the top header, switch to tab **2. Google Apps Script**, and click **Copy Code.gs**.
4. Paste the code into the Apps Script editor (replacing any boilerplate).
5. Set an optional secret key:
   ```javascript
   const SECRET_KEY = "your-custom-passphrase";
   ```
6. From the Apps Script toolbar function dropdown, select `seedInitialData` and click **Run** (authorizing permissions when prompted). This creates all 4 tabs (`Exercises`, `Templates`, `Strength_Logs`, `Cardio_Logs`).
7. Click **Deploy** → **New deployment**:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Copy the **Web App URL** (ends in `/exec`).
9. In PulseSheet on your iPhone, open **Sheets & Watch**, paste the Web App URL (and secret key if set), and tap **Save Connection Settings**.

---

## ⌚ Optional: Apple Watch Heart Rate Bridge (iOS Shortcut)

To pull average HR, peak HR, and active calories from your Apple Watch at the end of a workout:

1. Open the native **Shortcuts** app on your iPhone.
2. Create a new shortcut named exactly: `SyncWatchHR`.
3. Add the following actions:
   - **Find Health Samples**:
     - Type: `Heart Rate`
     - Start Date: `is in the last 1 hour`
   - **Calculate Statistics**:
     - Operation: `Average` of Health Samples (Save as variable `AvgHR`)
   - **Calculate Statistics**:
     - Operation: `Maximum` of Health Samples (Save as variable `MaxHR`)
   - **Find Health Samples**:
     - Type: `Active Energy`
     - Start Date: `is in the last 1 hour`
   - **Calculate Statistics**:
     - Operation: `Sum` of Health Samples (Save as variable `ActiveCals`)
   - **Open URLs**:
     - URL: `https://cbwichman.github.io/workout-tracker/?avg_hr=[AvgHR]&max_hr=[MaxHR]&cals=[ActiveCals]`
4. In PulseSheet, tap **Pull Watch HR** at the bottom of any active workout. It will trigger the shortcut and immediately populate your watch telemetry!

---

## 🛠 Local Development & Styling

- **Build CSS**:
  ```bash
  npm run build:css
  ```
- **Local Dev Server**:
  ```bash
  npm run serve
  ```