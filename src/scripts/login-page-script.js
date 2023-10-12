import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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

// Event Listener
document.getElementById("login-btn").addEventListener('click', (e) => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;


  e.preventDefault();

  // Don't proceed with authentication if inputs are empty
  if (username.trim() === '' || password.trim() === '') {
    alert("Username and password cannot be empty!");
    return; 
  }

  get(ref(db, "users/" + username))
  .then((snapshot) => {
    const data = snapshot.val()
    if (!data) {
      alert("User not found");
      return;
    }
    if (data.password === password) {
      window.open('product-backlog.html', '_self')
    } else {
      alert("Incorrect username/password!")
    }
  })
.catch((error) => {
  alert(error);
});
});
