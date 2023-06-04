// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkaH9FzCFL6XwUYHDg-znCpgmJEIot4aE",
  authDomain: "trackmeister0.firebaseapp.com",
  projectId: "trackmeister0",
  storageBucket: "trackmeister0.appspot.com",
  databaseURL: "https://trackmeister0-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "trackmeister0.appspot.com",
  messagingSenderId: "285201920604",
  appId: "1:285201920604:web:b5f3a432766bc58e7fec99",
  measurementId: "G-KPHRT4BJZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Enable Persistence
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export {auth};
// const analytics = getAnalytics(app);