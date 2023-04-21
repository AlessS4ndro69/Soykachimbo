
import { initializeApp } from 'firebase/app';
import {getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBheuPRpNzSOji8BE8LpfmcDYPo5j48d_A",
    authDomain: "repository-exercises.firebaseapp.com",
    projectId: "repository-exercises",
    storageBucket: "repository-exercises.appspot.com",
    messagingSenderId: "36138964769",
    appId: "1:36138964769:web:02b53900ea0f07a5309060"
};


const firebase = initializeApp(firebaseConfig);
//const firestore = getFirestore(app);

export default firebase;