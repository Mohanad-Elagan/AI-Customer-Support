import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKB4TmBWfLusYu5fNifhkd3xrthxjEUi8",
  authDomain: "fir-config-1fa50.firebaseapp.com",
  projectId: "fir-config-1fa50",
  storageBucket: "fir-config-1fa50.appspot.com",
  messagingSenderId: "850975202753",
  appId: "1:850975202753:web:85a072351d5fd1526c6340",
  measurementId: "G-D6MDETDWYE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);