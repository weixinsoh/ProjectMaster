import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue, update, remove} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { displayNavItem } from "./util.js"

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
const reference = ref(db, 'sprint/');

onValue(reference, (snapshot) => {
  displaySprint()
  displayNavItem()
});

function displaySprint() {
  const sprintCards = document.getElementById("sprint-cards")
  sprintCards.innerHTML = ""
  getSprint().then((sprints) => {
    sortSprint(sprints).forEach((sprint) => {
      const card = document.createElement("div")
      card.classList.add("sprint-card") 
      card.onclick = viewSprint.bind(null, sprint.name)
  
      const icon = document.createElement("span")
      icon.classList.add("icon")
      const deleteBtn = document.createElement("button")
      const editBtn = document.createElement("button")
      const chartBtn = document.createElement("button")
      deleteBtn.onclick = (e) => {
        e.stopPropagation()
        removeSprint(sprint.name)
      }
      editBtn.onclick = (e) => {
        e.stopPropagation()
        editSprint(sprint.name)
      }
      chartBtn.onclick = (e) => {
        e.stopPropagation()
        burndownChart(sprint.name)
      }
      deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon"></i>'
      editBtn.innerHTML = '<i class="fas fa-edit edit-icon"></i>'
      chartBtn.innerHTML = '<i class="fa fa-line-chart"></i>'
      icon.appendChild(chartBtn)
      icon.appendChild(editBtn)
      icon.appendChild(deleteBtn)
      const footer = document.createElement("div")
      footer.classList.add("sprint-footer")
      const otherInfo = document.createElement("p")
      //otherInfo.innerHTML = `Status: ${sprint.status}`
      otherInfo.innerHTML = `<b>Status: </b><span style="background-color: ${getStatusColor(sprint.status)}; padding: 1px 3px; border-radius: 5px">${sprint.status}</span>`
      footer.appendChild(otherInfo)
      footer.appendChild(icon)
  
      card.innerHTML = `
          <div class="sprint-header">
            <h2>${sprint.name}</h2>
          </div>
          <p>
          Start: ${sprint.start}<br>
          End: ${sprint.end}
          </p>
      `
      card.appendChild(footer)
      sprintCards.appendChild(card)

      if (sprint.status === "Not-started" && chartBtn.disabled === false) {
        chartBtn.disabled = true
      }

      if ((sprint.status === "In-progress" || sprint.status === "Completed") && editBtn.disabled === false) {
        editBtn.disabled = true
      }
    })
  })
}

function getStatusColor(status) {
  switch (status) {
    case "Not-started":
      return "#F8C0C0"
    case "In-progress":
      return "#8DCCF2"
    case "Completed":
      return "#D4F9C8"
  }
}

async function getSprint(){
  let retArr = [];

  try {
    const snapshot = await get(reference);
    const data = snapshot.val();

    for (const key in data) {
      retArr.push(data[key]);
    }

    return retArr; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

function sortSprint(sprints){
  return sprints.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function viewSprint(value) {
  window.open('sprint-backlog.html?id=' + value, '_self')
}

function removeSprint(value) {
  // Display a confirmation dialog
  if (confirm("Are you sure you want to delete this sprint?")) {
    // If the user confirms, proceed with deletion
    remove(ref(db, "sprint/" + value))
      .then(() => {
        alert("Sprint Deleted!");
      })
      .catch((error) => {
        console.error("Error deleting sprint:", error);
        alert("An error occurred while deleting the sprint.");
      });
  }
}

function editSprint(value) { 
  window.open('edit-sprint.html?id=' + value, '_self')
}

function burndownChart(value) {
  window.open('burndown-chart.html?id=' + value, '_self')
}

async function statusUpdate(){
  try{
    const sprints = await get(ref(db,"sprint/"))
    sprints.forEach((s) => {
      const data = s.val()
      if (data.status != "Completed" && new Date() >= new Date(data.end)){
        update(ref(db, "sprint/" + data.name),{
          status: "Completed"
        })
      }
      else if(data.status != "In-progress" && new Date() >= new Date(data.start) && new Date() < new Date(data.end)){
        update(ref(db, "sprint/" + data.name),{
          status: "In-progress"
        })
      }
    })
  } catch (e){
    console.log(e)
  }
}

statusUpdate()

/* Update initial total story points when sprint starts */
async function initialStoryPointUpdate(){
  try{
    const sprints = await get(ref(db, "sprint/"))
    sprints.forEach((s) => {
      const sprint = s.val()
      const storyPoints = JSON.parse(sprint.story_points)
      if (sprint.status === "In-progress" && storyPoints[sprint.start] < 0) {
        calcTotalSP(JSON.parse(sprint.tasks)).then(totalSP => {
          storyPoints[sprint.start] = totalSP
          update(ref(db, "sprint/" + sprint.name), {
            story_points: JSON.stringify(storyPoints)
          })
        })
      } else if (sprint.status === "Completed" && storyPoints[sprint.start] < 0) {
        for (const date in storyPoints) {
          storyPoints[date] = 0
        }
        update(ref(db, "sprint/" + sprint.name), {
          story_points: JSON.stringify(storyPoints)
        })
      }
    })
  } catch (e){
    console.log(e)
  }
}

async function calcTotalSP(tasks) {
  let totalSP = 0
  for (const name of tasks) {
    const snapshot = await get(ref(db, "task/" + name))
    const task = snapshot.val()
    if (task.status !== 'Completed') {
      totalSP += JSON.parse(task.story_point) 
    }
  }
  console.log(totalSP)
  return totalSP
}

initialStoryPointUpdate()

//  Add a confirmation dialog to ensure users want to log out before proceeding
function confirmLogout() {
  const confirmDialog = confirm("Are you sure you want to log out?");
  if (confirmDialog) {
    // If the user confirms, proceed with the logout
    window.location.href = "login-page.html"; // Redirect to the login page
  }
}

document.getElementById("logout-link").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  confirmLogout(); // Show the confirmation dialog
});