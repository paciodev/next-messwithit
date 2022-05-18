import { initializeApp, getApps, getApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsGNsagqzpQcUbTwNXkGMVq9GHUfH2Ak4",
  authDomain: "next-messwithit.firebaseapp.com",
  projectId: "next-messwithit",
  storageBucket: "next-messwithit.appspot.com",
  messagingSenderId: "786568920785",
  appId: "1:786568920785:web:7f16cb663d367a0a134ff0"
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, auth, provider }