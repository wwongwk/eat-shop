// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAA9I13X_sgHwkKMM4GDU6AGVi7loZS884",
    authDomain: "eat-shop-play-58b80.firebaseapp.com",
    projectId: "eat-shop-play-58b80",
    storageBucket: "eat-shop-play-58b80.appspot.com",
    messagingSenderId: "1002784736535",
    appId: "1:1002784736535:web:d504a3829747254dee2352",
    measurementId: "G-Z0HWSSVQ1B"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;
