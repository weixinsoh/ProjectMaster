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

// Event Listener
document.getElementById("create-sprint-btn").addEventListener('click', (e) => {
  const name = document.getElementById("sprint-name").value
  const start = document.getElementById('start-date').value;
  const end = document.getElementById('end-date').value;

  if (!validateInput(name, start, end)) return

  // Set the status to "not-started"
  const status = "Not-started";

  // set remaining story points for given date range
  let storyPoints = {}
  const dates = getDatesBetween(new Date(start), new Date(end))
  for (const date of dates) {
    storyPoints[date] = -1
  }
  
  e.preventDefault();

  // Check if the sprint name already exists
  const sprintRef = ref(db, "sprint/" + name);
  get(sprintRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Sprint name already exists, show an error message
        alert("sprint with the same name already exists!");
      } else {
        // Sprint name is unique, proceed with sprint creation
      set(ref(db, "sprint/" + name),{
        name: name,
        status: status,
        start: start,
        end: end,
        tasks: JSON.stringify([]),
        story_points: JSON.stringify(storyPoints)
      })
      .then(() => {
        alert("Sprint Created!");
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

document.getElementById("return-scrum-board-btn").addEventListener('click', () => {window.open('scrum-board.html', "_self")})

function getDatesBetween(startDate, endDate) {
  const currentDate = startDate;
  const dates = [];
  while (currentDate <= endDate) {
    const year = currentDate.toLocaleString("default", { year: "numeric" });
    const month = currentDate.toLocaleString("default", { month: "2-digit" });
    const day = currentDate.toLocaleString("default", { day: "2-digit" });
    const formattedDate = year + "-" + month + "-" + day;
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

function validateInput(name, start, end) {
  let retVal = true;

  if (name == "") {
    retVal = false;
    alert("Sprint name cannot be empty");
  }

  if (start == "") {
    retVal = false;
    alert("Start date cannot be empty");
  } else {
    const currentDate = new Date();
    const startDate = new Date(start);

    // Check if the start date is today or in the past (with time set to 00:00:00)
    if (startDate.setHours(0, 0, 0, 0) <= currentDate.setHours(0, 0, 0, 0)) {
      retVal = false;
      alert("Start date must be in the future");
    }
  }

  if (end == "") {
    retVal = false;
    alert("End date cannot be empty");
  }

  if (new Date(start) > new Date(end)) {
    retVal = false;
    alert("Start date must be before end date");
  }

  return retVal;
}

