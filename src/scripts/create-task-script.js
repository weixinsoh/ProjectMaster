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
document.getElementById("create-task-btn").addEventListener('click', (e) => {

  let cb = document.querySelectorAll('#task-tag input[type="checkbox"]');
  let tags = [];
  cb.forEach((b) => {
    if (b.checked) tags.push(b.value)
  })
  console.log(tags)

  const name = document.getElementById("task-name").value
  const story_point = document.getElementById("task-story-point").value
  const assignee = document.getElementById("task-assignee").value
  const description = document.getElementById("task-description").value
  const type = document.getElementById("task-type").value
  const tag = JSON.stringify(tags);
  const priority = document.getElementById("task-priority").value
  const status = document.getElementById("task-status").value
  const stages = document.getElementById("task-stages").value
  const date = new Date().toString()
  
  e.preventDefault();

  set(ref(db, "task/" + name),{
    name: name,
    story_point: story_point,
    assignee: assignee,
    description: description,
    type: type,
    tag: tag,
    priority: priority,
    status: status,
    stages: stages,
    date: date
  })
  .then(
    () => {alert("Task Created!")}
  )
  .catch((error) => {alert(error)})
})

document.getElementById("return-product-backlog-btn").addEventListener('click', () => {window.open('product-backlog.html', "_self")})