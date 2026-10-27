# SkillConnect - Local Job & Skill Matching Portal for Daily-Wage Workers

> **SkillConnect** is a modern, responsive web application engineered to connect unskilled and semi-skilled daily-wage workers (masons, painters, plumbers, carpenters, loaders, electricians, gardeners, helpers) with nearby verified employers and contractors without middleman commissions.

---

## 🌟 Key Features

1. **Hyperlocal Job Discovery**
   - Proximity-based job discovery with distance estimation (e.g. 2.4 km away).
   - Locality and landmark mapping with travel time cues.

2. **Smart Skill-Based Matching**
   - Real-time compatibility matching (%) between worker skills and contractor site requirements.
   - Color-coded match badges (Green: >85%, Blue: 70-85%).

3. **Multilingual & Audio Accessibility for Low Digital Literacy**
   - Instant language switching between **English**, **Hindi (हिंदी)**, and **Kannada (ಕನ್ನಡ)**.
   - Built-in **Text-to-Speech Audio Helper** (via browser SpeechSynthesis API) reading job titles, wages, and requirements aloud in the selected regional language.

4. **Guaranteed Fair Wage & Daily Payouts**
   - Interactive **Daily Wage Calculator & Advisory** establishing statutory fair wages per trade and experience level (₹450 - ₹1200+/day).
   - Prevents wage exploitation and sets clear payment frequency (Daily Cash/UPI at shift end).

5. **Worker Experience & Hub**
   - Browse, search, and multi-filter jobs (category, distance radius, wage range, experience).
   - 1-Click Application with optional site readiness notes.
   - **Application Status Tracker**: Applied ➔ Under Review ➔ Shortlisted ➔ Accepted/Hired ➔ Rejected.
   - Bookmarked / Saved jobs.
   - Worker digital skill pass with Aadhaar verification badge.

6. **Employer & Contractor Hub**
   - Post daily-wage openings in under 60 seconds with required skills, workers needed, wage rate, shift timings, and safety equipment provisioning.
   - **Applicant Reviewer**: View matching worker profiles, experience, and contact numbers.
   - Update application status with custom feedback notes (e.g. "Report at gate 2 tomorrow at 8:30 AM").
   - Close or reopen jobs anytime.

7. **Safety & Fraud Prevention**
   - **Zero Tolerance for Advance Fees**: Predefined reporting categories for deposit demands, unpaid wages, or unsafe sites.
   - **Contact Privacy Shielding**: Worker and employer phone numbers are shielded until an application is made, preventing harassment and spam.
   - **Admin Safety Queue**: Supervisors can review reports, warn employers, or take down fraudulent postings instantly.

8. **Dual-Mode Persistence (Firebase Cloud + Local Persistent Storage)**
   - Fully wired for **Google Cloud Firestore** and **Firebase Authentication**.
   - If Firebase keys are not yet provided in `.env`, SkillConnect gracefully operates in **Local Persistent Storage Mode**, persisting all profiles, jobs, applications, reports, and notifications across browser sessions without mock placeholders or crashes.

---

## 🏗️ Project Architecture

```
c:\JOBS\
├── index.html                   # HTML5 Entrypoint with Inter & Indic typography
├── package.json                 # Dependencies (React 18, Vite, Tailwind CSS, Lucide icons, Firebase)
├── vite.config.js               # Vite build and dev server configuration
├── tailwind.config.js           # Blue-and-white theme & responsive layout configuration
├── postcss.config.js            # PostCSS autoprefixer & Tailwind pipeline
├── firestore.rules              # Production-grade Firestore Security Rules
├── .env.example                 # Firebase environment configuration template
├── .env                         # Local environment settings
└── src/
    ├── main.jsx                 # React root mount point with context providers
    ├── App.jsx                  # Main routing, layout, and modal coordinator
    ├── index.css                # Tailwind directives and clean animations
    ├── context/
    │   ├── AuthContext.jsx      # User roles (Worker, Employer, Admin), session persistence
    │   ├── JobContext.jsx       # Real-time jobs CRUD, matching score, applications pipeline
    │   └── LanguageContext.jsx  # English, Hindi, Kannada i18n & SpeechSynthesis audio reader
    ├── services/
    │   ├── firebase.js          # Firebase SDK initialization & LocalStorage repository fallback
    │   ├── sampleData.js        # Realistic sample daily-wage jobs (clearly labeled `isSample: true`)
    │   └── translations.js      # Complete multilingual dictionary & trade categories
    └── components/
        ├── common/
        │   ├── Navbar.jsx               # Header with language switch, role badge, notification popover
        │   ├── Footer.jsx               # Helpline (1800-200-WAGE), wage advisory, safety links
        │   ├── NotificationDropdown.jsx # Real-time alerts for application status changes
        │   ├── ReportModal.jsx          # Safety & fraud complaint form
        │   └── AudioHelper.jsx          # Accessibility SpeechSynthesis button
        ├── landing/
        │   ├── HeroSection.jsx          # Hero headline, live search & 1-click evaluation bar
        │   ├── CategoryGrid.jsx         # 12 visual trade categories with baseline wages
        │   ├── HowItWorks.jsx           # 3-step walkthrough for Workers and Employers
        │   ├── DailyWageCalculator.jsx  # Interactive wage calculator & fair rate benchmark
        │   └── TrustAndSafety.jsx       # Worker protection charter & emergency helpline
        ├── jobs/
        │   ├── JobCard.jsx              # Match score badge, wage box, sample indicator, quick apply
        │   ├── JobFilters.jsx           # Query, location, distance radius, wage slider, experience
        │   └── JobDetailModal.jsx       # Full task details, contact disclosure, application submission
        ├── worker/
        │   └── WorkerDashboard.jsx      # Recommended jobs, application pipeline, saved jobs, profile
        ├── employer/
        │   └── EmployerDashboard.jsx    # Openings, applicant reviewer with status updater, post job form
        └── admin/
            └── AdminDashboard.jsx       # Fraud reports queue, listing moderation, demo seeder
```

---

## ⚡ Quick Start Guide

### 1. Install Dependencies
In the project root (`c:\JOBS`):
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port displayed in your terminal).

---

## 🚀 1-Click Evaluation Credentials

SkillConnect comes with built-in 1-Click Demo Logins so you can immediately inspect the portal across all three roles without typing credentials:

1. **Daily-Wage Worker**:
   - **Name**: Ramesh Kumar
   - **Trade**: Mason & Plasterer (4 yrs experience, Koramangala)
   - **Access**: Click **"Worker"** in the 1-Click Demo Bar or modal.
   - **Features to try**: View matched jobs with 92% score, track status of submitted applications, use the **"Listen Aloud"** audio reader, edit skills in Worker Hub.

2. **Employer / Contractor**:
   - **Name**: Sharma Infrastructure & Projects (Rajesh Sharma)
   - **Trade**: Civil Contractor & Renovation
   - **Access**: Click **"Employer"** in the 1-Click Demo Bar or modal.
   - **Features to try**: Review applicants for active jobs, change application status to **Shortlisted** or **Hired/Accepted**, post a new daily-wage job.

3. **Administrator**:
   - **Role**: Platform Safety Supervisor
   - **Access**: Click **"Admin"** in the 1-Click Demo Bar or modal.
   - **Features to try**: Inspect the Fraud & Complaint queue, take down suspicious jobs, reset or clear demo data.

---

## 🔒 Firebase Configuration & Security Rules

### Connecting Live Google Firebase (Optional)
If you wish to connect SkillConnect to a live Google Cloud Firebase project:
1. Navigate to the [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Enable **Authentication** (Email/Password or Anonymous/Phone).
3. Enable **Cloud Firestore** in test or production mode.
4. Copy your web app config keys into `.env`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-app-id
   VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```
5. Deploy `firestore.rules`:
   ```bash
   firebase deploy --only firestore:rules
   ```

### Security Rules Highlights (`firestore.rules`)
- **Authorized Data Access**: Workers can only read and modify their own applications and profiles.
- **Privacy Enforcement**: Private contact details (phone, exact address) are restricted and only shared between mutually matched workers and employers.
- **Minimum Wage Guardrail**: Job creation rules require `dailyWage >= 300` to prevent severe statutory exploitation.
- **Admin Isolation**: The reports and fraud queue can only be reviewed and actioned by verified admin tokens.

---

## 🌐 Multilingual Support
SkillConnect includes native translations in:
- **English (EN)**
- **Hindi (हिंदी - HI)**
- **Kannada (ಕನ್ನಡ - KN)**

Toggle between languages at any time from the top bar or footer. All headings, filters, forms, statuses, and voice synthesis adapt instantly.

---

## 🛡️ License
Built for the community to empower daily-wage workers. Open and free for non-commercial and public-good deployment.

