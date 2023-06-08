// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
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
export const checkAuthState = (onUserAuthenticated, onUserLoggedOut) => {
  const auth = getAuth();
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is authenticated
      onUserAuthenticated(user);
    } else {
      // User is logged out
      onUserLoggedOut();
    }
  });
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const auth = getAuth(app);
export {auth};
// const analytics = getAnalytics(app);