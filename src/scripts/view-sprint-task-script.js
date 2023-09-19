import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, get, child} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
// import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement, Title, Tooltip } from 'https://cdn.jsdelivr.net/npm/chart.js';
// import { DateTimeAdapter } from 'https://github.com/chartjs/chartjs-adapter-moment';

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
  document.getElementById("task-tag").innerHTML = tags.map((tag) => {return `<span style="background-color: ${getTagColor(tag)}; padding: 1px 3px; border-radius: 5px">${tag}</span>`}).join(" ")
  document.getElementById("task-priority").innerHTML = `<span style="background-color: ${getPriorityColor(data.priority)}; padding: 1px 3px; border-radius: 5px">${data.priority}</span>`
  document.getElementById("task-status").innerHTML = data.status
  document.getElementById("task-stages").innerHTML = data.stages
})

document.getElementById("return-sprint-backlog-btn")
    .addEventListener('click', () => {
        window.open('sprint-backlog.html?id=' + receivedID, "_self")
})

// Insert Log Time
const popup = document.getElementById("insert-log-time-popup")

document.getElementById("insert-log-time").addEventListener('click', () => {
    popup.style.display = "block"
})

document.getElementById("close-popup-btn").addEventListener('click', () => {
    popup.style.display = "none"
})

document.getElementById("log-time-btn").addEventListener('click', () => {
    const startDate = document.getElementById("start-date").value
    const endDate = document.getElementById("end-date").value
    const startTime = document.getElementById("start-time").value
    const endTime = document.getElementById("end-time").value

    const intervalMillis = new Date(`${endDate}T${endTime}`) - new Date(`${startDate}T${startTime}`)
    
    if (intervalMillis < 0) {
        alert("End time must be later than start time.")
    }

    const hrs = Math.floor(intervalMillis / 3600000)
    const mins = Math.floor((intervalMillis % 3600000) / 60000)
    document.getElementById("total-time-logged").innerHTML = `Total: ${hrs} hrs ${mins} mins`
    // update logged time in data
})

// Generate Chart
const ctx = document.getElementById("acc-of-effort-chart").getContext("2d")
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2023-09-01', '2023-09-02', '2023-09-04'],   // should be retrieved from database
        datasets: [{
            label: 'Accumulation of Effort',
            data: [5, 20, 30],    // should be retrieved from database
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