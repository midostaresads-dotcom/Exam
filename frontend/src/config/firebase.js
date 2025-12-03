// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfb57pA_a41vZ6_y-HlVpkTeyIN9w_nuI",
  authDomain: "british-academy-45d3e.firebaseapp.com",
  projectId: "british-academy-45d3e",
  storageBucket: "british-academy-45d3e.firebasestorage.app",
  messagingSenderId: "698404367594",
  appId: "1:698404367594:web:2d7fe10749c554532cfb93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
