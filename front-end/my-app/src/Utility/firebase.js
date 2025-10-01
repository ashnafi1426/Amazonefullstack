import { initializeApp } from "firebase/app";
// Authentication service
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwK8BWxXyfkPgI9HKAKICa7_DshUqeJ_8",
  authDomain: "clone-61fed.firebaseapp.com",
  projectId: "clone-61fed",
  storageBucket: "clone-61fed.appspot.com",
  messagingSenderId: "516902780438",
  appId: "1:516902780438:web:4e23e64f91a3b17312ff37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
