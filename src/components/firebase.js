import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCT4rOwKyJ_BNf3dUC-DKHfWzI1DdgsDaw",
  authDomain: "capstone-e3196.firebaseapp.com",
  projectId: "capstone-e3196",
  storageBucket: "capstone-e3196.appspot.com",
  messagingSenderId: "1013547251815",
  appId: "1:1013547251815:web:4e20732b07df02744afcc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// The firestore database (db from now on)
export default getFirestore(app);

// Setting up the Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
