import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
    apiKey: "AIzaSyAcRC3cB5ojAsW4BLa95erAJo1GEUhG5mM",
    authDomain: "happycare-394b5.firebaseapp.com",
    projectId: "happycare-394b5",
    storageBucket: "happycare-394b5.appspot.com",
    messagingSenderId: "518705182773",
    appId: "1:518705182773:web:da2b112ce4af596908197c"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore();
export { auth, database };