import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, get, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { checkLoginStatus, getPriorityColor, getTagColor, toggleTheme } from "./util.js";

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
checkLoginStatus()

onValue(ref(db, 'users/' + localStorage.getItem('username')), (snapshot) => {
  const data = snapshot.val();
  if (data['theme']) {
    toggleTheme(data['theme'])
  }
});

get(child(reference, `/${receivedID}`)).then((snapshot) =>{
  const data = snapshot.val(); 
  const tags = JSON.parse(data.tag)
  document.getElementById("task-name").innerHTML = data.name
  document.getElementById("task-story-point").innerHTML = data.story_point
  document.getElementById("task-assignee").innerHTML = data.assignee
  document.getElementById("task-description").innerHTML = data.description
  document.getElementById("task-type").innerHTML = data.type
  document.getElementById("task-tag").innerHTML = tags.map((tag) => {return `<span class="highlight-text" style="background-color: ${getTagColor(tag)};">${tag}</span>`}).join(" ")
  document.getElementById("task-priority").innerHTML = `<span class="highlight-text" style="background-color: ${getPriorityColor(data.priority)};">${data.priority}</span>`
  document.getElementById("task-status").innerHTML = data.status
  document.getElementById("task-stages").innerHTML = data.stages
})

document.getElementById("return-product-backlog-btn").addEventListener('click', () => {window.open('product-backlog.html', "_self")})
