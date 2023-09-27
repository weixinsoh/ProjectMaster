import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue, update} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyACyBE4-v3Z5qL37njca-CaPUPXMHfzZbY",
    authDomain: "fit2101-team4.firebaseapp.com",
    databaseURL: "https://fit2101-team4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fit2101-team4",
    storageBucket: "fit2101-team4.appspot.com",
    messagingSenderId: "413420787548",
    appId: "1:413420787548:web:be8873c231ec4468845399"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const reference = ref(db, 'task/');

const urlParams = new URLSearchParams(window.location.search);
const receivedID = urlParams.get('id')

get(child(reference, `/${receivedID}`)).then((snapshot) =>{
    const data = snapshot.val();
    document.getElementById("task-name").value = data.name
    document.getElementById("task-story-point").value = data.story_point
    document.getElementById("task-assignee").value = data.assignee
    document.getElementById("task-description").value = data.description
    document.querySelectorAll('#task-tag input[type="checkbox"]').forEach(cb => {JSON.parse(data.tag).includes(cb.value) ? cb.checked = true : cb.checked = false})
    document.getElementById("task-priority").value = data.priority
    document.getElementById("task-priority").style.backgroundColor = getPriorityColor(priority.value)
    document.getElementById("task-status").value = data.status
    document.getElementById("task-stages").value = data.stages
})

document.getElementById("edit-task-btn").addEventListener('click', saveChange)
document.getElementById("return-product-backlog-btn").addEventListener('click', () => {window.open('product-backlog.html', "_self")})

function saveChange(){

  let cb = document.querySelectorAll('#task-tag input[type="checkbox"]');
  let tags = [];
  cb.forEach((b) => {
    if (b.checked) tags.push(b.value)
  })

  update(ref(db, "task/" + receivedID), {
    name: document.getElementById("task-name").value,
    story_point: document.getElementById("task-story-point").value,
    assignee: document.getElementById("task-assignee").value,
    description: document.getElementById("task-description").value,
    tag: JSON.stringify(tags),
    priority: document.getElementById("task-priority").value,
    status: document.getElementById("task-status").value,
    stages: document.getElementById("task-stages").value
  }).then(
    () => {alert("Updated Task!")}
  )
}

const priority = document.getElementById("task-priority")
priority.addEventListener("change", function() {
  priority.style.backgroundColor = getPriorityColor(priority.value)
})

function getPriorityColor(priority) {
  switch (priority) {
    case "Urgent":
      return "#F65B51"
    case "Important":
      return "lightsalmon"
    case "Medium":
      return "#FFFA84"
    case "Low":
      return "lightgreen"
  }
}