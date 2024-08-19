import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "daily-blog-3ca4c.firebaseapp.com",
  projectId: "daily-blog-3ca4c",
  storageBucket: "daily-blog-3ca4c.appspot.com",
  messagingSenderId: "782680401903",
  appId: "1:782680401903:web:fa435676f1bd760f09781a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);