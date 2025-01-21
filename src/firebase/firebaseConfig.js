// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Импорт авторизации

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvYo-05-MmS90yXiAvDCo3AxQGgNGMyaE",
  authDomain: "dnd-multiverse.firebaseapp.com",
  projectId: "dnd-multiverse",
  storageBucket: "dnd-multiverse.firebasestorage.app",
  messagingSenderId: "684583035497",
  appId: "1:684583035497:web:40907c6a796af288b178f8",
  measurementId: "G-HZDM00FB6T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);

// Export Firebase Authentication
export const auth = getAuth(app); // Экспортируем объект аутентификации