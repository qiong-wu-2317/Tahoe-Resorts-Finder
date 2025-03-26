// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKdood_BFiN2j-cw6531jRCUgmCyY7Rd4",
  authDomain: "tahoeresortsfinder.firebaseapp.com",
  projectId: "tahoeresortsfinder",
  storageBucket: "tahoeresortsfinder.firebasestorage.app",
  messagingSenderId: "495569839472",
  appId: "1:495569839472:web:ac800b99698dd19ff1dbb5",
  measurementId: "G-DYPEHE83EY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
