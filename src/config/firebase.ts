import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjwUBK4dFV2sAQu2CYxN7v8GGfh7oI334",
  authDomain: "test-auth-dbaee.firebaseapp.com",
  projectId: "test-auth-dbaee",
  storageBucket: "test-auth-dbaee.appspot.com",
  messagingSenderId: "1089177216137",
  appId: "1:1089177216137:web:0fa2240525fa5192065258"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const Firebase_Auth = getAuth(app)