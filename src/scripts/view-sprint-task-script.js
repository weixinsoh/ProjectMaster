import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, get, child, onValue, update} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
console.log(receivedID)

// Display Task Details
get(child(reference, `/${receivedID}`)).then((snapshot) =>{
  const data = snapshot.val();
  const tags = JSON.parse(data.tag)
  console.log(tags)
  document.getElementById("task-name").innerHTML = data.name
  document.getElementById("task-story-point").innerHTML = data.story_point
  document.getElementById("task-assignee").innerHTML = data.assignee
  document.getElementById("task-description").innerHTML = data.description
  document.getElementById("task-tag").innerHTML = tags.map((tag) => {return `<span class="highlight-text" style="background-color: ${getTagColor(tag)};">${tag}</span>`}).join(" ")
  document.getElementById("task-priority").innerHTML = `<span class="highlight-text" style="background-color: ${getPriorityColor(data.priority)};">${data.priority}</span>`
  document.getElementById("task-status").innerHTML = data.status
  document.getElementById("task-stages").innerHTML = data.stages
})

document.getElementById("return-sprint-backlog-btn")
    .addEventListener('click', () => {
        window.open('sprint-backlog.html?id=' + receivedID, "_self")
})

// Insert Log Time
const logTimePopup = document.getElementById("insert-log-time-popup")

document.getElementById("insert-log-time").addEventListener('click', () => {
    logTimePopup.style.display = "block"
})

document.getElementById("close-popup-btn").addEventListener('click', () => {
    logTimePopup.style.display = "none"
})

document.getElementById("log-time-btn").addEventListener('click', async () => {
    const date = document.getElementById("date").value
    const startTime = document.getElementById("start-time").value
    const endTime = document.getElementById("end-time").value

    // document.getElementById("total-time-logged").innerHTML = `Total: ${hrs} hrs ${mins} mins`

    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes = endHours * 60 + endMinutes;
    const timeDifferenceInMinutes = totalEndMinutes - totalStartMinutes;

    const snapshot = await get(ref(db, "task/" + receivedID))
    const task = snapshot.val()
    let logtime = JSON.parse(task.logtime)
    logtime.hasOwnProperty(date) ? logtime[date] += timeDifferenceInMinutes : logtime[date] = timeDifferenceInMinutes

    update(ref(db, "task/" + receivedID), {
      logtime: JSON.stringify(logtime)
    }).then(() => {alert("Updated Logtime!")})
})

// Generate Chart
const chartPopup = document.getElementById("chart-popup")

document.getElementById("chart-btn").addEventListener('click', async () => {
  chartPopup.style.display = "block"

  const snapshot = await get(ref(db, "task/" + receivedID))
  const task = snapshot.val()
  const lt = JSON.parse(task.logtime)
  const ctx = document.getElementById("acc-of-effort-chart").getContext("2d")
  if (Chart.getChart("acc-of-effort-chart")) {
    Chart.getChart("acc-of-effort-chart").destroy()
  }
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Object.keys(lt),
        datasets: [{
            label: 'Accumulation of Effort',
            data: Object.values(lt),
            borderColor: 'rgb(235, 52, 88)',
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'DD'
                    }
                },
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                beginAtZero: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Log Time Spent'
                }
            }
        }
    }
  })
})

document.getElementById("close-chart-btn").addEventListener('click', () => {
  chartPopup.style.display = "none"
})

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

onValue(ref(db, "task/" + receivedID), (snapshot) => {
  const data = snapshot.val()
  const logtime = JSON.parse(data.logtime)
  const totalLT = Object.values(logtime).reduce((acc,lt) => acc + lt, 0)
  document.getElementById("total-time-logged").innerHTML = `Total: ${Math.floor(totalLT/60)} hrs ${totalLT % 60} mins`
})