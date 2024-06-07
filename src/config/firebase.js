import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAd_UcW-HoykSC1OQbwWRF9d5ulAs3j0VI",
  authDomain: "testbase-733ab.firebaseapp.com",
  projectId: "testbase-733ab",
  storageBucket: "testbase-733ab.appspot.com",
  messagingSenderId: "625901745278",
  appId: "1:625901745278:web:b242626f4f524859be942f",
  measurementId: "G-39DVT0YTK1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
