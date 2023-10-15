import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, get, onValue, update} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { toggleTheme } from "./util.js";

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

const username = localStorage.getItem('username')

get(ref(db, "users/" + username)).then((snapshot) => {
    const data = snapshot.val()
    console.log(data)
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        console.log(radio.value)
        if (radio.value == data.theme){
            radio.checked = true
        }
    })
})

document.querySelectorAll('input[name="theme"]').forEach(radio => radio.addEventListener('change', () => {
    if (radio.checked) {
        console.log(radio.value)
        toggleTheme(radio.value)
        update(ref(db, "users/" + username), {
            theme: radio.value
        })
    }
}))


