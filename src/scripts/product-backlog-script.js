import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue, remove} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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

onValue(reference, (snapshot) => {
  // document.getElementById("tasks").innerHTML = ""
  // const data = snapshot.val();
  // for (const key in data){
  //   document.getElementById("tasks").innerHTML += `<div>${data[key].name}</div>`
  // }
  displayTask()
});

document.getElementById("filter-task").addEventListener('change', displayTask)
document.getElementById("sort-task").addEventListener('change', displayTask)

async function filterTask() {
  const filterBy = document.getElementById("filter-task").value;
  let retArr = [];

  try {
    const snapshot = await get(reference);
    const data = snapshot.val();

    for (const key in data) {
      if (filterBy === "All" || JSON.parse(data[key].tag).includes(filterBy)){
        retArr.push(data[key]);
      }
    }

    return retArr; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

function sortTask(filtered){
  const sortBy = document.getElementById("sort-task").value
  const urgent = filtered.filter((obj) => obj.priority == "Urgent")
  const important = filtered.filter((obj) => obj.priority == "Important")
  const medium = filtered.filter((obj) => obj.priority == "Medium")
  const low = filtered.filter((obj) => obj.priority == "Low")
  switch(sortBy){
    case "urgency-desc":
      return urgent.concat(important, medium, low)
    case "urgency-asc":
      return low.concat(medium, important, urgent)
    case "recency-asc": 
      return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    case "recency-desc":
      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

function displayTask() {
  const taskCards = document.getElementById("task-cards")
  taskCards.innerHTML = ""
  filterTask().then((filtered) => {
    const sorted = sortTask(filtered)
    sorted.forEach((task) => {
      const card = document.createElement("div")
      card.classList.add("task-card") 
      card.onclick = viewTask.bind(null, task.name)

      const icon = document.createElement("span")
      icon.classList.add("icon")
      const deleteBtn = document.createElement("button")
      const editBtn = document.createElement("button")
      deleteBtn.onclick = (e) => {
        e.stopPropagation()
        removeTask(task.name)
      }
      editBtn.onclick = (e) => {
        e.stopPropagation()
        editTask(task.name)
      }
      deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon"></i>'
      editBtn.innerHTML = '<i class="fas fa-edit edit-icon"></i>'
      icon.appendChild(editBtn)
      icon.appendChild(deleteBtn)
      const footer = document.createElement("div")
      footer.classList.add("task-footer")
      const otherInfo = document.createElement("p")
      otherInfo.innerHTML = `<b>Priority: </b><span style="background-color: ${getPriorityColor(task.priority)}; padding: 1px 3px; border-radius: 5px">${task.priority}</span>`
      footer.appendChild(otherInfo)
      footer.appendChild(icon)

      let tags = ""
      for (const element of JSON.parse(task.tag)){
        tags += `<span style="background-color: ${getTagColor(element)}; padding: 1px 3px; border-radius: 5px">${element}</span>&nbsp`
      }

      card.innerHTML = `
          <div class="task-header">
            <h2>${task.name}</h2>
            <span class="story-points">${task.story_point}</span>
          </div>
          <p>
            ${tags}
          </p>
      `
      card.appendChild(footer)
      taskCards.appendChild(card)
    })
  })
}

function getTagColor(tag) {
  switch (tag) {
    case "Frontend":
      return "mediumpurple"
    case "Backend":
      return "pink"
    case "API":
      return "lightblue"
    case "Testing":
      return "deepskyblue"
    case "Framework":
      return "tan"
    case "UI":
      return "antiquewhite"
    case "UX":
      return "silver"
    case "Database":
      return "aquamarine"
  }
}

function getPriorityColor(priority) {
  switch (priority) {
    case "Urgent":
      return "orangered"
    case "Important":
      return "lightsalmon"
    case "Medium":
      return "lemonchiffon"
    case "Low":
      return "lightgreen"
  }
}

function viewTask(value) {
  window.open('view-task.html?id=' + value, '_self')
}

function removeTask(value){
  remove(ref(db, "task/" + value)).then(alert("Task Deleted!"))
}

function editTask(value) { 
  window.open('edit-task.html?id=' + value, '_self')
}