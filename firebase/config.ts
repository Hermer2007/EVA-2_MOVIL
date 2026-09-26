import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCk_sZUV_CKcEpQhnjUmwjV-m8ijSgR9zY",
  authDomain: "mahm-prueba.firebaseapp.com",
  databaseURL: "https://mahm-prueba-default-rtdb.firebaseio.com",
  projectId: "mahm-prueba",
  storageBucket: "mahm-prueba.firebasestorage.app",
  messagingSenderId: "924171087642",
  appId: "1:924171087642:web:bdd5146ca468ffe6b8c6a3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);