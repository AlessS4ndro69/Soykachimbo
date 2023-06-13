
import { initializeApp } from 'firebase/app';
import {getFirestore } from 'firebase/firestore'
import {FIREBASE_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from "@env"

/*
const firebaseConfig = {
    apiKey: "AIzaSyBheuPRpNzSOji8BE8LpfmcDYPo5j48d_A",
    authDomain: "repository-exercises.firebaseapp.com",
    projectId: "repository-exercises",
    storageBucket: "repository-exercises.appspot.com",
    messagingSenderId: "36138964769",
    appId: "1:36138964769:web:02b53900ea0f07a5309060"
};*/
const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};


const firebase = initializeApp(firebaseConfig);
//const firestore = getFirestore(app);

export default firebase;