import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDyekqyQo8WTdvjAPuKDMKGSlTb7D2HzCQ",
    authDomain: "olx-clone-33.firebaseapp.com",
    projectId: "olx-clone-33",
    storageBucket: "olx-clone-33.appspot.com",
    messagingSenderId: "298081861082",
    appId: "1:298081861082:web:59124c27fd62763d0b14e3",
  };

export default firebase.initializeApp(firebaseConfig)


