import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyC5QMhQEZAH3w53bZ4HdLaq0M_vGh6LEkc",
  authDomain: "whutsapp-70cf7.firebaseapp.com",
  databaseURL: "https://whutsapp-70cf7.firebaseio.com",
  projectId: "whutsapp-70cf7",
  storageBucket: "whutsapp-70cf7.appspot.com",
  messagingSenderId: "388466580564",
  appId: "1:388466580564:web:e9c78e7dda193a6cf1a1c1",
  measurementId: "G-3MP030ZQBR"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase