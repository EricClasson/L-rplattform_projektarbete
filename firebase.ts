import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqMYb37HQv9CcbRybrDysrffPT7k6yonw",
  authDomain: "l-rplattform.firebaseapp.com",
  projectId: "l-rplattform",
  storageBucket: "l-rplattform.appspot.com",
  messagingSenderId: "873051627821",
  appId: "1:873051627821:web:cb9193c64da25be09eb3a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const p_formCollection = collection(db, "test");
export const p_assignment = collection(db, "Assignments");
