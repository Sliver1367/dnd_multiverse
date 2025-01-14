// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvYo-05-MmS90yXiAvDCo3AxQGgNGMyaE",
  authDomain: "dnd-multiverse.firebaseapp.com",
  projectId: "dnd-multiverse",
  storageBucket: "dnd-multiverse.firebasestorage.app",
  messagingSenderId: "684583035497",
  appId: "1:684583035497:web:40907c6a796af288b178f8",
  measurementId: "G-HZDM00FB6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);