import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, update, get, child, onValue, remove} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
const taskReference = ref(db, 'task/');
const sprintReference = ref(db, 'sprint/')

onValue(sprintReference, (snapshot) => {
  displayTask()
});

const urlParams = new URLSearchParams(window.location.search);
const receivedID = urlParams.get('id')

async function getOccupiedTask(){
  let retArr = [];

  try {
      const snapshot = await get(ref(db,'sprint/'));
      const data = snapshot.val();

      for (const key in data) {
        retArr = retArr.concat(JSON.parse(data[key].tasks));
      }

      return retArr; 
  } catch (error) {
      console.error(error);
      throw error; 
  }
}

function displayTask() {
  const taskCards = document.getElementById("task-cards")
  taskCards.innerHTML = ""
  getOccupiedTask().then((occupied) => {
    get(taskReference).then((snapshot) =>{
      const tasks = snapshot.val();
      for(const key in tasks){
        if (!occupied.includes(tasks[key].name)){
          const card = document.createElement("div")
          card.classList.add("task-card") 
          const checkbox = document.createElement("input")
          checkbox.classList.add("checkbox")
          checkbox.type = "checkbox"
          checkbox.value = tasks[key].name

          let tags = ""
          for (const element of JSON.parse(tasks[key].tag)){
            tags += `<span style="background-color: ${getTagColor(element)}; padding: 1px 3px; border-radius: 5px">${element}</span>&nbsp`
          }

          card.innerHTML = `
            <div class="task-header">
                <h2>${tasks[key].name}</h2>
                <h2>${tasks[key].story_point}</h2>
            </div>
            <p class="task-tags">
                ${tags}
            </p>
            <p>
                <b>Priority: </b>
                <span style="background-color: ${getPriorityColor(tasks[key].priority)}; padding: 1px 3px; border-radius: 5px">
                    ${tasks[key].priority}
                </span>
            </p>
          `
          card.appendChild(checkbox)
          taskCards.appendChild(card)
        } 
      }
  })
})}

function getTagColor(tag) {
  switch (tag) {
    case "Frontend":
      return "mediumpurple"
    case "Backend":
      return "pink"
    case "API":
      return "lightblue"
    case "Testing":
      return "rgba(0, 102, 255, 0.67)"
    case "Framework":
      return "tan"
    case "UI":
      return "rgba(255, 170, 134)"
    case "UX":
      return "silver"
    case "Database":
      return "aquamarine"
  }
}

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

// Event Listener
document.getElementById("add-sprint-task-btn").addEventListener('click', async (e) => {
    e.preventDefault()
    let cb = document.querySelectorAll('input[type="checkbox"]');
    let retArr = []
    cb.forEach((b) => {
      if(b.checked){
        retArr.push(b.value)
      }
    })

    if (retArr.length == 0) {
      alert("Select at least one task to be assigned to the sprint!")
    } else {
      try{
        const prevTasks = await getPreviousTask();
        const updatedTasks = await prevTasks.concat(retArr)
        await update(ref(db, "sprint/" + receivedID), {
          tasks: JSON.stringify(updatedTasks)
        });
        alert("Tasks added!")
      }
      catch(e){
        alert(e.message)
      }
    }
})

document.getElementById("return-sprint-backlog-btn")
    .addEventListener('click', () => {
        window.open('sprint-backlog.html?id=' + receivedID, "_self")
})

async function getPreviousTask() {
  const snapshot = await get(child(sprintReference, `/${receivedID}`));
  const data = snapshot.val();
  return JSON.parse(data.tasks);
}


