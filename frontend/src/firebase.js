// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc36laaKmdEOe2QIn1juKMaVvsVE4Naoo",
  authDomain: "biblioteca-f42a7.firebaseapp.com",
  projectId: "biblioteca-f42a7",
  storageBucket: "biblioteca-f42a7.firebasestorage.app",
  messagingSenderId: "233018455782",
  appId: "1:233018455782:web:b18d6411aac30e3ce0ed27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };