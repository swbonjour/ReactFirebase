import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD0DRT6Af0ADhFpIwRbWW5UzKlLT2emyg4",
  authDomain: "socketchat-1b186.firebaseapp.com",
  projectId: "socketchat-1b186",
  storageBucket: "socketchat-1b186.appspot.com",
  messagingSenderId: "674045710416",
  appId: "1:674045710416:web:c38f2a735ec6ca6aab0155"
};

export const app = initializeApp(firebaseConfig);