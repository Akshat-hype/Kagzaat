// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAojt3XwMXgVAKQIMIX8JeUaiJaoOlyBWY",
  authDomain: "kagzaat-32e85.firebaseapp.com",
  projectId: "kagzaat-32e85",
  storageBucket: "kagzaat-32e85.appspot.com", // <- fixed typo
  messagingSenderId: "358189807057",
  appId: "1:358189807057:web:77db637dfd7615d5cfdcf0",
  measurementId: "G-TKK7V27K8Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
