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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const reference = ref(db)

const urlParams = new URLSearchParams(window.location.search);
const receivedID = urlParams.get('id')

// Event Listener
document.getElementById("filter-task").addEventListener('change', displayTask)
document.getElementById("sort-task").addEventListener('change', displayTask)
document.getElementById("add-task-btn").addEventListener('click', () => {
    // Unable to add task if the sprint has started
    get(child(ref(db, 'sprint/'), `/${receivedID}`)).then((snapshot) =>{
        const data = snapshot.val();
        const sprintStatus = data.status
        if(sprintStatus === "Not-started")
            return window.open('add-sprint-task.html?id=' + receivedID, '_self')
        else
            return alert("Unable to add task once sprint has started.")
    })
})

async function filterTask() {
  try {
    const filterBy = document.getElementById("filter-task").value;
    const snapshot = await get(child(ref(db, "sprint"), `/${receivedID}`));
    const data = snapshot.val();
    const tasks = JSON.parse(data.tasks)
    let retArr = []
    for(const name of tasks){
      const task = await getTask(name)
      if(filterBy === "All" || JSON.parse(task.tag).includes(filterBy)){
        retArr.push(task)
      }
    }
    return retArr
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

async function getTask(id){
  const snapshot = await get(ref(db, "task/" + id))
  const data = snapshot.val()
  return data
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

onValue(reference, (snapshot) => {
    displayTask()
});

function isOverdue(dueDate) {
    const currentDate = new Date();
    const targetDate = new Date(dueDate)
    return currentDate > targetDate;
}

async function displayTask(){

    // Clear existing task lists
    document.getElementById("Not-started").innerHTML = "";
    document.getElementById("In-progress").innerHTML = "";
    document.getElementById("Completed").innerHTML = "";
    document.getElementById("Overdue").innerHTML = "";

    const snapshot = await get(ref(db, "sprint/" + receivedID))
    const data = snapshot.val()
    const sprintDue = data.end
    const sprintStatus = data.status

    // Hide add button once sprint started
    if(sprintStatus !== "Not-started"){
      const addButton = document.getElementById('add-task-btn');
      addButton.style.display = 'none';
    }
    
    // Show sprint details (sprint name, status, date)
    document.getElementById("left-header").innerHTML = "";
    const leftHeader = document.createElement("div")
    leftHeader.classList.add("left-details") 
    const otherInfoLeft = document.createElement("p")
    otherInfoLeft.innerHTML = `<h2 style="display: inline-block; margin-left: 70px; margin-top: 30px;">${receivedID}</h2>
    <span style="display: inline-block; margin-left: 10px;">${sprintStatus}</span>`
    leftHeader.appendChild(otherInfoLeft)
    document.getElementById("left-header").appendChild(leftHeader);

    document.getElementById("right-header").innerHTML = "";
    const rightHeader = document.createElement("div")
    rightHeader.classList.add("right-details") 
    const otherInfoRight = document.createElement("p")
    otherInfoRight.innerHTML = `<h2 style="display: inline-block; margin-right: 80px; margin-top: 50px; font-size: 13px">Date: &nbsp;&nbsp;${data.start} - ${data.end}</h2>`
    rightHeader.appendChild(otherInfoRight)
    document.getElementById("right-header").appendChild(rightHeader);

    filterTask().then((filtered) => {
      const sorted = sortTask(filtered)
      sorted.forEach((t) => {
        switch(t.status){
          case "Not-started":
            if(isOverdue(sprintDue)) 
                displayCard("Overdue", t, sprintStatus)
            else
                displayCard("Not-started", t, sprintStatus)
            break
          case "In-progress":
              if(isOverdue(sprintDue)) 
                  displayCard("Overdue", t, sprintStatus)
              else
                  displayCard("In-progress", t, sprintStatus)
              break
          case "Completed":
              displayCard("Completed", t, sprintStatus)
              break
          case "Overdue":
              displayCard("Overdue", t, sprintStatus)
              break
        }
      })
    })
}

function displayCard(status, taskData, sprintStatus) {
    
    // Create a task card element
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-cards");

    taskCard.innerHTML = ""
    const card = document.createElement("div")
    card.classList.add("task-card") 

    // Unable to drag when sprint is completed
    if(sprintStatus != "Completed"){
      card.setAttribute("draggable", "true");
    }
    else card.setAttribute("draggable", "false")

    card.onclick = viewTask.bind(null, taskData.name)

    const icon = document.createElement("span")
    icon.classList.add("icon")

    // Only show delete button before the sprint start
    const deleteBtn = document.createElement("button")
    if(sprintStatus == "Not-started"){
        deleteBtn.onclick = (e) => {
            e.stopPropagation()
            removeTask(taskData.name)
        }
        deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon"></i>';
        icon.appendChild(deleteBtn);
    }

    const footer = document.createElement("div")
    footer.classList.add("task-footer")
    const otherInfo = document.createElement("p")
    otherInfo.innerHTML = `<b>Priority: </b><span style="background-color: ${getPriorityColor(taskData.priority)}; padding: 1px 3px; border-radius: 5px">${taskData.priority}</span>`
    footer.appendChild(otherInfo)
    footer.appendChild(icon)

    let tags = ""
    for (const element of JSON.parse(taskData.tag)){
        tags += `<span style="background-color: ${getTagColor(element)}; padding: 1px 3px; border-radius: 5px">${element}</span>&nbsp`
    }

    card.innerHTML = `
        <div class="task-header">
          <h3 id="name">${taskData.name}</h3>
          <span class="story-points">${taskData.story_point}</span>
        </div>
        <p class="task-tags">
          ${tags}
        </p>
    `
    card.appendChild(footer)
    taskCard.appendChild(card)

    // Append the task card to the appropriate HTML element (e.g., "not-started")
    document.getElementById(status).appendChild(taskCard);
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

  async function removeTask(value){
    try{
      const snapshot = await get(child(ref(db,"sprint/"), `/${receivedID}`))
      const data = snapshot.val();
      const updatedTask = JSON.parse(data.tasks).filter(t => t !== value)
      await update(ref(db, "sprint/" + receivedID),{
        tasks: JSON.stringify(updatedTask)
      })
      alert("Removed task from sprint!");
    } catch (e){
      console.log(e)
    }
  }

  function viewTask(value) {
    window.open('view-sprint-task.html?id=' + value, '_self')
  }

const triggers = document.querySelectorAll('.droppable');
const draggables = document.querySelectorAll('.task-card')

triggers.forEach(trigger => {
  trigger.addEventListener('dragover', (e) => {
    e.preventDefault();
    trigger.querySelector('.container').style.border = '2px dashed #ccc';
  });

  trigger.addEventListener('dragleave', () => {
    trigger.querySelector('.container').style.border = '1px solid #ccc';
  });

  trigger.addEventListener('drop', (e) => {
    e.preventDefault();
    trigger.querySelector('.container').style.border = '1px solid #ccc';

    if (draggedCard) {
        update(ref(db, "task/" + draggedCard.querySelector('#name').innerHTML), {
            status: trigger.querySelector('.container').id
        })
    }
  });
});

let draggedCard = null;

document.addEventListener('dragstart', (e) => {
  draggedCard = e.target;
  e.dataTransfer.setData('text/plain', e.target.innerHTML);
});

document.addEventListener('dragend', () => {
  draggedCard = null;
});