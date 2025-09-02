# 🖥️ Activity Logger & Archiver

A Node.js tool that monitors **keyboard activity** and captures **screenshots** at set intervals.  
When the session ends, it generates a **PDF report** of keyboard logs, creates a **.zip archive** containing all logs + screenshots, and then cleans up raw files for tamper resistance.  

---

## ✨ Features
- ⌨️ Logs keyboard activity (keypress counts)  
- 🖼️ Captures screenshots automatically  
- 📄 Converts daily logs into a clean **PDF report**  
- 📦 Automatically zips logs + screenshots into one archive on exit  
- 🔒 Deletes raw files after archiving to prevent tampering  
- 🕒 Live console timer shows elapsed session time  

---

## 🛠️ Tech Stack
- [Node.js](https://nodejs.org/)  
- [uiohook-napi](https://www.npmjs.com/package/uiohook-napi) → global keyboard tracking  
- [screenshot-desktop](https://www.npmjs.com/package/screenshot-desktop) → screen capture  
- [pdfkit](https://www.npmjs.com/package/pdfkit) → PDF report generation  
- [archiver](https://www.npmjs.com/package/archiver) → zipping logs & screenshots  
- [dayjs](https://www.npmjs.com/package/dayjs) → time/date formatting  

---

## 📂 Project Structure
```
.
├── logs/                  # Daily logs + PDF reports
├── screenshots/           # Daily screenshots
├── archive_DATE.zip       # Final archive per session
└── index.js               # Main script
```

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/activity-logger.git
cd activity-logger
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Script
```bash
node screenshot.js
or 
npm run system
```

- Screenshots are captured every 10 minutes (default).  
- Keyboard activity is logged alongside.  
- Press `Ctrl+C` to exit → the script generates a **PDF report** and a **ZIP archive**.  

---

## 📦 Output
After exit, you’ll see something like:

```
archive_01_September_2025.zip
```

Inside:
- `logs/DATE/keys.pdf` → PDF report of keyboard activity  
- `screenshots/DATE/*.png` → Captured screenshots  

---

## 🔮 Roadmap
- [ ] Add a **UI (Electron.js / Web Dashboard)** for start/stop controls and live status  
- [ ] Adjustable intervals for screenshots & logs  
- [ ] Cloud upload (Google Drive / AWS S3) for safe storage  
- [ ] Tamper-proofing with hash/signature validation  

---

## 🤝 Contributing
Looking for collaborators to help build a **UI layer** (Electron.js, React, or Vue) with:  
- Start/Stop controls  
- Live screenshot previews  
- Keypress activity charts  

If you’re interested, feel free to fork, open an issue, or reach out!  

---

## 📜 License
MIT License — free to use, share, and improve.
