// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3QqZA3Add9byH7geMVK0lAenk2qHD6q4",
  authDomain: "login-signup-4e2c1.firebaseapp.com",
  projectId: "login-signup-4e2c1",
  storageBucket: "login-signup-4e2c1.appspot.com",
  messagingSenderId: "698174089164",
  appId: "1:698174089164:web:5f15226d7adba66b369f69",
  measurementId: "G-BM1691P9EY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app);

export { auth, db, storage, ref, getDownloadURL, uploadBytes, collection, addDoc, getDocs, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup };
