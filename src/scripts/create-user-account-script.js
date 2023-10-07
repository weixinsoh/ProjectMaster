import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyACyBE4-v3Z5qL37njca-CaPUPXMHfzZbY",
  authDomain: "fit2101-team4.firebaseapp.com",
  databaseURL: "https://fit2101-team4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fit2101-team4",
  storageBucket: "fit2101-team4.appspot.com",
  messagingSenderId: "413420787548",
  appId: "1:413420787548:web:be8873c231ec4468845399"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const usersRef = ref(db, "users");

document.getElementById("create-user-account-btn").addEventListener('click', () => {
    const userName = document.getElementById("user-name").value;
    const userEmail = document.getElementById("user-email").value;
    const userPassword = document.getElementById("user-password").value;
  
    // Create an object to represent the user data
    const userData = {
      name: userName,
      email: userEmail,
      password: userPassword
    };
  
    // Push user data to the database (this generates a unique key for each user)
    const newUserRef = push(usersRef);
    set(newUserRef, userData)
      .then(() => {
        alert("User account created successfully!");
      })
      .catch((error) => {
        alert("Error creating user account: " + error.message);
      });
  });
  