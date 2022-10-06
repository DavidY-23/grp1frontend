import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";


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

export const auth = getAuth(app)
