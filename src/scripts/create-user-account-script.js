import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child, push, orderByChild, query, equalTo, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { checkLoginStatus, toggleTheme } from "./util.js";

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
checkLoginStatus()

onValue(ref(db, 'users/' + localStorage.getItem('username')), (snapshot) => {
  const data = snapshot.val();
  if (data['theme']) {
    toggleTheme(data['theme'])
  }
});

// Event Listener
document.getElementById("create-user-account-btn").addEventListener('click', (e) => {
  
  e.preventDefault();

  const userName = document.getElementById("user-name").value;
  const userEmail = document.getElementById("user-email").value;
  const userPassword = document.getElementById("user-password").value;

  if (userName === "" || userEmail === "" || userPassword === ""){
    alert("Input field cannot be blank!")
    return
  }

  const usersRef = ref(db, "users/" + userName);
  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        alert("Username already exists!");
      } else {
        const q = query(ref(db, 'users'), orderByChild('email'), equalTo(userEmail))
        get(q).then((snapshot) => {
          if (snapshot.exists()) {
            alert("Email already in use!");
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(userEmail)) {
              set(ref(db, "users/" + userName), {
                username: userName,
                email: userEmail,
                password: userPassword,
                role: "member",
              })
              .then(() => {
                alert("User account created!")
              })
              .catch((error) => {
                alert(error)
              })
            } else { alert("Invalid email!") }
          }
        });
      }
  })
  .catch((error) => {
    alert(error)
  })
});
