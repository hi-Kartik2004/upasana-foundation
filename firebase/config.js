// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// kartik;s firebase config
const firebaseConfig = {
  apiKey: "AIzaSyByIZJ3Wr9SuL7kuqLoRpFhuoImZCZWEjw",
  authDomain: "upasana-foundation.firebaseapp.com",
  projectId: "upasana-foundation",
  storageBucket: "upasana-foundation.appspot.com",
  messagingSenderId: "509656610048",
  appId: "1:509656610048:web:3781f6d13d6b04358b6fe5",
  measurementId: "G-K099BT2Z2D",
};

// upasana foundations's config
// const firebaseConfig = {
//   apiKey: "AIzaSyAN3sbolsz4bIa5tJE_Q83wu2NlV1j98DM",
//   authDomain: "upasana-foundation-web.firebaseapp.com",
//   projectId: "upasana-foundation-web",
//   storageBucket: "upasana-foundation-web.appspot.com",
//   messagingSenderId: "230245723702",
//   appId: "1:230245723702:web:705753ffb9ab16823bb297",
//   measurementId: "G-K099BT2Z2D",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
