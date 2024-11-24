// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhKGRxuApl73cZopMoF8sk-SS9GeK0Rk4",
  authDomain: "field-project-sign-in.firebaseapp.com",
  projectId: "field-project-sign-in",
  storageBucket: "field-project-sign-in.firebasestorage.app",
  messagingSenderId: "627842275145",
  appId: "1:627842275145:web:64636faa9697b71bd6ac98"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
