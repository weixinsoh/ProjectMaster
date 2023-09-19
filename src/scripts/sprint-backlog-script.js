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
const reference = ref(db, "sprint")

const urlParams = new URLSearchParams(window.location.search);
const receivedID = urlParams.get('id')

// Event Listener
document.getElementById("filter-task").addEventListener('change', displayTask)
document.getElementById("sort-task").addEventListener('change', displayTask)
document.getElementById("add-task-btn").addEventListener('click', () => {
    // Unable to add task if the sprint has started
    get(child(reference, `/${receivedID}`)).then((snapshot) =>{
        const data = snapshot.val();
        const sprintStatus = data.status
        if(sprintStatus === "Not-started")
            return window.open('add-sprint-task.html?id=' + receivedID, '_self')
        else
            return alert("Unable to add task once sprint has started.")
    })
})

// Copied function, havent use
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

function displayTask(){

    // Clear existing task lists
    document.getElementById("not-started").innerHTML = "";
    document.getElementById("in-progress").innerHTML = "";
    document.getElementById("completed").innerHTML = "";
    document.getElementById("overdue").innerHTML = "";

    const filterBy = document.getElementById("filter-task").value;
    
    get(child(reference, `/${receivedID}`)).then((snapshot) =>{
        const data = snapshot.val();
        const sprintDue = data.end
        const sprintStatus = data.status

        const tasks = JSON.parse(data.tasks)
        tasks.forEach((task) => {
            get(child(ref(db,"task"), `/${task}`)).then((snapshot) => {
                const data = snapshot.val();

                // Filter tasks based on tags
                if (filterBy === "All" || JSON.parse(data.tag).includes(filterBy)){

                    // Check if the sprint end, put all incompleted task into overdue column
                    switch(data.status){
                        case "Not-started":
                            if(isOverdue(sprintDue)) 
                                displayCard("overdue", data, sprintStatus)
                            else
                                displayCard("not-started", data, sprintStatus)
                            break
                        case "In-progress":
                            if(isOverdue(sprintDue)) 
                                displayCard("overdue", data, sprintStatus)
                            else
                                displayCard("in-progress", data, sprintStatus)
                            break
                        case "Completed":
                            displayCard("completed", data, sprintStatus)
                            break
                        case "Overdue":
                            displayCard("overdue", data, sprintStatus)
                            break
                    }
                }
            })
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
    card.setAttribute("draggable", "true");
    card.onclick = viewTask.bind(null, taskData.name)

    const icon = document.createElement("span")
    icon.classList.add("icon")

    // Unable to delete task if the sprint has started
    const deleteBtn = document.createElement("button")
    if(sprintStatus != "Not-started"){
        deleteBtn.onclick = (e) => {
            e.stopPropagation()
            removeTask(taskData.name)
            taskCard.removeChild(card)
        }
        deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon"></i>';
    }
    else {
        deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon" style="color: darkgrey;"></i>';
        deleteBtn.onclick = () => {
            alert("Unable to delete task once sprint has started.")
        }
    }
    icon.appendChild(deleteBtn)

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
          <h3>${taskData.name}</h3>
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

  // Something wrong here
  function removeTask(value){
    taskRef = ref(db, "sprint/" + value)
    remove(taskRef).then(alert("Task Removed!"))
  }

  function viewTask(value) {
    window.open('view-sprint-task.html?id=' + value, '_self')
  }
  