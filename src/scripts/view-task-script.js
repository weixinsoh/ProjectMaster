import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, get, child} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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

document.getElementById("return-product-backlog-btn").addEventListener('click', () => {window.open('product-backlog.html', "_self")})

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
