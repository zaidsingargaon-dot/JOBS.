// SkillConnect Firebase & Local Persistent Storage Integration
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from "firebase/firestore";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

// Read Firebase environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if valid Firebase configuration is supplied
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  !firebaseConfig.apiKey.includes("your_firebase_api_key_here") &&
  firebaseConfig.apiKey.trim().length > 10
);

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.info("[SkillConnect] Connected successfully to Google Cloud Firestore & Firebase Auth.");
  } catch (error) {
    console.warn("[SkillConnect] Error initializing Firebase. Falling back to Local Persistent Storage.", error);
  }
} else {
  console.info("[SkillConnect] Running in Local Persistent Storage Mode (Offline-first / Firebase Ready). Provide valid keys in .env to connect to live Firebase.");
}

export { app, auth, db };

// Local Persistent Storage Manager for standalone zero-configuration operation
const STORAGE_KEYS = {
  JOBS: "skillconnect_jobs_v1",
  APPLICATIONS: "skillconnect_applications_v1",
  SAVED_JOBS: "skillconnect_saved_jobs_v1",
  NOTIFICATIONS: "skillconnect_notifications_v1",
  REPORTS: "skillconnect_reports_v1",
  USERS: "skillconnect_users_v1",
  CURRENT_USER: "skillconnect_session_user_v1"
};

export const localStorageRepo = {
  get: (key, defaultValue) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage:`, e);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom event for real-time reactive cross-component sync
      window.dispatchEvent(new CustomEvent("skillconnect_storage_update", { detail: { key } }));
    } catch (e) {
      console.error(`Error writing ${key} to localStorage:`, e);
    }
  },
  keys: STORAGE_KEYS
};

