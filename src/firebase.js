// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6p7iusxwXj9SL3xhsakcRraqyxFk8GcI",
  authDomain: "boatproj-fa315.firebaseapp.com",
  projectId: "boatproj-fa315",
  storageBucket: "boatproj-fa315.firebasestorage.app",
  messagingSenderId: "746404835897",
  appId: "1:746404835897:web:9fab706088fd69326713e8",
  measurementId: "G-K78YZV26GT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
    const db = getFirestore(app);
    export {db}




  
