
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDj4xWDZY3VZMM-Wwgs_98Huu8ij1psq7A",
  authDomain: "hotel-booking-app-d9e8c.firebaseapp.com",
  projectId: "hotel-booking-app-d9e8c",
  storageBucket: "hotel-booking-app-d9e8c.appspot.com",
  messagingSenderId: "521717786611",
  appId: "1:521717786611:web:8e4a211c28e6f0d3b79486",
  measurementId: "G-KYD6EY5GNM"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
export {auth, db};