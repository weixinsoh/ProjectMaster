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
  document.getElementById("task-name").innerHTML = data.name
  document.getElementById("task-story-point").innerHTML = data.story_point
  document.getElementById("task-assignee").innerHTML = data.assignee
  document.getElementById("task-description").innerHTML = data.description
  document.getElementById("task-tag").innerHTML = data.tag
  document.getElementById("task-priority").innerHTML = data.priority
  document.getElementById("task-status").innerHTML = data.status
  document.getElementById("task-stages").innerHTML = data.stages
})

document.getElementById("return-product-backlog-btn").addEventListener('click', () => {window.open('product-backlog.html', "_self")})