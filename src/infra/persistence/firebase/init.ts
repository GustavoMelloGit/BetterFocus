// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCmh3qIHTaBEANCJrCQpI7hBWQYckNqE5o',
  authDomain: 'better-focus-51c3c.firebaseapp.com',
  projectId: 'better-focus-51c3c',
  storageBucket: 'better-focus-51c3c.appspot.com',
  messagingSenderId: '819732256353',
  appId: '1:819732256353:web:0902ae6c3a07f6f70b7c20',
  measurementId: 'G-00BTTXRC8G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
