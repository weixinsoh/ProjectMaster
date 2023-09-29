import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child, push} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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

// Event Listener
document.getElementById("create-sprint-btn").addEventListener('click', (e) => {
  const name = document.getElementById("sprint-name").value
  const status = document.getElementById("sprint-status").value
  const start = document.getElementById('start-date').value;
  const end = document.getElementById('end-date').value;

  // set remaining story points for given date range
  let storyPoints = {}
  const dates = getDatesBetween(new Date(start), new Date(end))
  for (const date of dates) {
    storyPoints[date] = -1
  }
  
  e.preventDefault();

  // Check if the task name already exists
  const taskRef = ref(db, "sprint/" + name);
  get(taskRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Task name already exists, show an error message
        alert("sprint with the same name already exists!");
      } else {
        // Task name is unique, proceed with task creation
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