// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8V4E0DJCEv0xeQ4HxYvkt8zB9t64aQ8g",
  authDomain: "quirkitopia-space-e9c99.firebaseapp.com",
  projectId: "quirkitopia-space-e9c99",
  storageBucket: "quirkitopia-space-e9c99.appspot.com",
  messagingSenderId: "289595942677",
  appId: "1:289595942677:web:0b23a1b43f86321c89eb1c",
  measurementId: "G-S9T22RQTM9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
