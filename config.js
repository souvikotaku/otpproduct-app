import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyD2pPp8nhiJYGvuauoZDxfDj7NXL_z12bI",
  authDomain: "phone-auth-52a11.firebaseapp.com",
  projectId: "phone-auth-52a11",
  storageBucket: "phone-auth-52a11.appspot.com",
  messagingSenderId: "261606800922",
  appId: "1:261606800922:web:e446d68d482c7027b71ba3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
