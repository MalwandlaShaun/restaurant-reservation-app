import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase} from "firebase/database"
// Initializing Firebase with config
const firebaseConfig = {
  apiKey: "AIzaSyAy4ubMD29Q5f2bd9raL-kYYI1YHwpDQks",
  authDomain: "restaurant-app-2-76fd0.firebaseapp.com",
  projectId: "restaurant-app-2-76fd0",
  storageBucket: "restaurant-app-2-76fd0.appspot.com",
  messagingSenderId: "466013794175",
  appId: "1:466013794175:web:b2f0673383d9f2899a344a",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export default FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getDatabase(app);



