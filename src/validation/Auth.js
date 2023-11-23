// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMzsNsRvr_UdGXZwB1sT5U3J32dQYxrCc",
  authDomain: "reusable-login-and-signup.firebaseapp.com",
  projectId: "reusable-login-and-signup",
  storageBucket: "reusable-login-and-signup.appspot.com",
  messagingSenderId: "439417883250",
  appId: "1:439417883250:web:b1c532a8a34833610910eb",
  measurementId: "G-2MSH4LW65E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const  provider = new GoogleAuthProvider()
const analytics = getAnalytics(app);

export {auth, provider}