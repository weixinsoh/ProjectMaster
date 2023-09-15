import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child, push} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
document.getElementById("create-sprint-btn").addEventListener('click', (e) => {
  const name = document.getElementById("sprint-name").value
  const description = document.getElementById("sprint-description").value
  const status = document.getElementById("sprint-status").value
  const date = new Date().toString()
  
  e.preventDefault();

  set(ref(db, "sprint/" + name),{
    name: name,
    description: description,
    type: type,
    status: status,
    date: date
  })
  .then(
    () => {alert("Sprint Created!")}
  )
  .catch((error) => {alert(error)})
})

document.getElementById("return-scrumboard-btn").addEventListener('click', () => {window.open('scrumboard.html', "_self")})