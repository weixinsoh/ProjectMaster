import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, update, get, child, onValue, remove} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
const reference = ref(db, "sprint")

const urlParams = new URLSearchParams(window.location.search);
const receivedID = urlParams.get('id')

document.getElementById("add-task-btn").addEventListener('click', () => {window.open('add-sprint-task.html?id=' + receivedID, '_self')})

onValue(reference, (snapshot) => {
    displayTask()
});

function displayTask(){
    get(child(reference, `/${receivedID}`)).then((snapshot) =>{
        const data = snapshot.val();
        const tasks = JSON.parse(data.tasks)
        tasks.forEach((task) => {
            get(child(ref(db,"task"), `/${task}`)).then((snapshot) => {
                const data = snapshot.val();
                switch(data.status){
                    case "Not-started":
                        document.getElementById("not-started").append(data.name)
                        break
                    case "In-progress":
                        document.getElementById("in-progress").append(data.name)
                        break
                    case "Completed":
                        document.getElementById("completed").append(data.name)
                        break
                }
            })
        })
    })
}