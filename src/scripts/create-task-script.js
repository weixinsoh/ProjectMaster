
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child, push, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
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

onValue (ref(db, 'users/'), (snapshot) =>{
  const data = snapshot.val();
  const members = Object.keys(data);
  members.forEach((member) => {
    const opt = document.createElement("option");
    opt.text = member
    opt.value = member
    document.getElementById('task-assignee').appendChild(opt)
  })
})

// Event Listener
document.getElementById("create-task-btn").addEventListener('click', (e) => {
  let cb = document.querySelectorAll('#task-tag input[type="checkbox"]');
  let tags = [];
  cb.forEach((b) => {
    if (b.checked) tags.push(b.value)
  })

  const name = document.getElementById("task-name").value;
  const story_point = document.getElementById("task-story-point").value;
  const assignee = document.getElementById("task-assignee").value;
  const description = document.getElementById("task-description").value;
  const type = document.getElementById("task-type").value;
  const tag = JSON.stringify(tags);
  const priority = document.getElementById("task-priority").value;
  const status = document.getElementById("task-status").value;
  const stages = document.getElementById("task-stages").value;
  const date = new Date().toString();

  if (!validateInput(name, description, JSON.parse(tag))) return

  e.preventDefault();

  // Check if the task name already exists
  const taskRef = ref(db, "task/" + name);
  get(taskRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Task name already exists, show an error message
        alert("Task with the same name already exists!");
      } else {
        // Task name is unique, proceed with task creation
        set(ref(db, "task/" + name), {
          name: name,
          story_point: story_point,
          assignee: assignee,
          description: description,
          type: type,
          tag: tag,
          priority: priority,
          status: status,
          stages: stages,
          date: date,
          logtime: JSON.stringify({})
        })
          .then(() => {
            alert("Task Created!");
          })
          .catch((error) => {
            alert(error);
          });
      }
    })
    .catch((error) => {
      alert(error);
    });
});

const priority = document.getElementById("task-priority");
priority.addEventListener("change", function () {
  priority.style.backgroundColor = getPriorityColor(priority.value);
});

document.getElementById("return-product-backlog-btn").addEventListener('click', () => {
  window.open('product-backlog.html', "_self");
});

function getPriorityColor(priority) {
  switch (priority) {
    case "Urgent":
      return "#F65B51";
    case "Important":
      return "lightsalmon";
    case "Medium":
      return "#FFFA84";
    case "Low":
      return "lightgreen";
  }
}

function validateInput(name, description, tag) {
  let retVal = true

  if (name == ""){
    retVal = false
    alert("Task name cannot be empty")
  }

  if (description == ""){
    retVal = false
    alert("Task description cannot be empty")
  }

  if (tag.length == 0){ 
    retVal = false
    alert("At least one tag must be chosen")

  }

  return retVal
}