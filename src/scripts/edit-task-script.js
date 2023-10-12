import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue, remove} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { checkLoginStatus } from "./util.js";

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
checkLoginStatus()

const urlParams = new URLSearchParams(window.location.search);
// const receivedID = urlParams.get('id')
let oldName = ""
let taskDate = ""
let taskLogTime = ""

get(child(reference, `/${urlParams.get('id')}`)).then((snapshot) =>{
    const data = snapshot.val();
    oldName = data.name
    taskDate = data.date
    taskLogTime = data.logtime
    document.getElementById("task-name").value = data.name
    document.getElementById("task-story-point").value = data.story_point
    document.getElementById("task-assignee").value = data.assignee
    document.getElementById("task-description").value = data.description
    document.getElementById("task-type").value = data.type
    document.querySelectorAll('#task-tag input[type="checkbox"]').forEach(cb => {JSON.parse(data.tag).includes(cb.value) ? cb.checked = true : cb.checked = false})
    document.getElementById("task-priority").value = data.priority
    document.getElementById("task-priority").style.backgroundColor = getPriorityColor(priority.value)
    document.getElementById("task-status").value = data.status
    document.getElementById("task-stages").value = data.stages
})

document.getElementById("edit-task-btn").addEventListener('click', saveChange)
document.getElementById("return-product-backlog-btn").addEventListener('click', () => {window.open('product-backlog.html', "_self")})

function saveChange(){
  const taskName = document.getElementById("task-name").value

  get(child(reference, `/${taskName}`))
    .then((snapshot) => {
      if (oldName !== taskName && snapshot.exists()) {
        // Task name already exists, show an error message
        alert("Task with the same name already exists!");
      } else {
        let cb = document.querySelectorAll('#task-tag input[type="checkbox"]');
        let tags = [];
        cb.forEach((b) => {
          if (b.checked) tags.push(b.value)
        })
        remove(ref(db, "task/" + urlParams.get('id')))

        urlParams.set('id', taskName)

        set(ref(db, "task/" + taskName), {
          name: taskName,
          story_point: document.getElementById("task-story-point").value,
          assignee: document.getElementById("task-assignee").value,
          description: document.getElementById("task-description").value,
          type: document.getElementById("task-type").value,
          tag: JSON.stringify(tags),
          priority: document.getElementById("task-priority").value,
          status: document.getElementById("task-status").value,
          stages: document.getElementById("task-stages").value,
          date: taskDate,
          logtime: taskLogTime,
        }).then(
          () => {alert("Updated Task!")}
        )
      }})
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