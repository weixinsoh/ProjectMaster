import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
      if (filterBy === "all" || data[key].tag === filterBy) {
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
  const urgent = filtered.filter((obj) => obj.priority == "urgent")
  const important = filtered.filter((obj) => obj.priority == "important")
  const medium = filtered.filter((obj) => obj.priority == "medium")
  const low = filtered.filter((obj) => obj.priority == "low")
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
  document.getElementById("tasks").innerHTML = ""
  filterTask().then((filtered) => {
    const sorted = sortTask(filtered)
    console.log(sorted)
    //display html
    sorted.forEach((obj) => document.getElementById("tasks").innerHTML += `<div>${obj.name}</div>`)
  })
}

