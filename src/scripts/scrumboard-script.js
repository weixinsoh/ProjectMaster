import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, onValue, remove} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
  // document.getElementById("tasks").innerHTML = ""
  // const data = snapshot.val();
  // for (const key in data){
  //   document.getElementById("tasks").innerHTML += `<div>${data[key].name}</div>`
  // }
  displaySprint()
});

function displaySprint() {
  const taskCards = document.getElementById("sprint-cards")
  taskCards.innerHTML = ""
    sorted.forEach((sprint) => {
      const card = document.createElement("div")
      card.classList.add("sprint-card") 
      card.onclick = viewSprint.bind(null, sprint.name)

      const icon = document.createElement("span")
      icon.classList.add("icon")
      const deleteBtn = document.createElement("button")
      const editBtn = document.createElement("button")
      deleteBtn.onclick = (e) => {
        e.stopPropagation()
        removeSprint(sprint.name)
      }
      editBtn.onclick = (e) => {
        e.stopPropagation()
        editSprint(sprint.name)
      }
      deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon"></i>'
      editBtn.innerHTML = '<i class="fas fa-edit edit-icon"></i>'
      icon.appendChild(editBtn)
      icon.appendChild(deleteBtn)
      const footer = document.createElement("div")
      footer.classList.add("sprint-footer")
      const otherInfo = document.createElement("p")
      footer.appendChild(otherInfo)
      footer.appendChild(icon)

      card.innerHTML = `
          <div class="sprint-header">
            <h2>${sprint.name}</h2>
          </div>
          <p>
            
      `
      card.appendChild(footer)
      sprintCards.appendChild(card)
    })
  }


function viewSprint(value) {
  window.open('view-sprint.html?id=' + value, '_self')
}

function removeSprint(value){
  remove(ref(db, "sprint/" + value)).then(alert("Sprint Deleted!"))
}

function editSprint(value) { 
  window.open('edit-sprint.html?id=' + value, '_self')
}