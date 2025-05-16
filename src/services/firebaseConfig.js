import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBV45cGvNEpZszgnA9s5Gfxm26fkHa3Xx4",
  authDomain: "apnabillgenerator.firebaseapp.com",
  databaseURL: "https://apnabillgenerator-default-rtdb.firebaseio.com",
  projectId: "apnabillgenerator",
  storageBucket: "apnabillgenerator.appspot.com",
  messagingSenderId: "33291715220",
  appId: "1:33291715220:web:9b01bb7d0f6fc26d75ea81",
  measurementId: "G-690WJRQWLL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc, updateDoc, increment };