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
const reference = ref(db, 'sprint/');

const urlParams = new URLSearchParams(window.location.search);
// const receivedID = urlParams.get('id')

get(child(reference, `/${urlParams.get('id')}`)).then((snapshot) =>{
    const data = snapshot.val();
    document.getElementById("sprint-name").value = data.name
    document.getElementById("start-date").value = data.start
    document.getElementById("end-date").value = data.end
    document.getElementById("sprint-status").value = data.status
})

document.getElementById("edit-sprint-btn").addEventListener('click', saveChange)
document.getElementById("return-scrum-board-btn").addEventListener('click', () => {window.open('scrum-board.html', "_self")})

function saveChange() {
  const sprintNameInput = document.getElementById("sprint-name");
  const sprintName = sprintNameInput.value;
  
  // Check if the sprint name already exists
  get(child(reference, `/${sprintName}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        alert("sprint with the same name already exists!");
      } else {
        // The sprint name doesn't exist, proceed with the update
        let storyPoints = {};
        const start = document.getElementById("start-date").value;
        const end = document.getElementById("end-date").value;
        const dates = getDatesBetween(new Date(start), new Date(end));
        for (const date of dates) {
          storyPoints[date] = -1;
        }

        remove(ref(db, "sprint/" + urlParams.get('id')));

        urlParams.set('id', sprintName);

        set(ref(db, "sprint/" + sprintName), {
          name: sprintName,
          start: start,
          end: end,
          status: document.getElementById("sprint-status").value,
          story_points: JSON.stringify(storyPoints)
        }).then(() => {
          alert("Updated Sprint!");
        });
      }
    })
    .catch((error) => {
      console.error("Error checking sprint name:", error);
    });
}


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
