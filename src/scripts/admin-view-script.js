import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, get, child, onValue, update, remove} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { confirmLogout, checkLoginStatus } from "./util.js";
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

onValue(ref(db, 'users/' + localStorage.getItem('username')), (snapshot) => {
    const data = snapshot.val();
    if (data['theme']) {
      toggleTheme(data['theme'])
    }
});

document.getElementById("logout-link").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    confirmLogout(); // Show the confirmation dialog
  });

// Function to display user data
function displayUserData(userName, userEmail, userPassword) {
    // Create user element
    const user = document.createElement("div");
    user.classList.add("user-col");
    user.innerHTML = `<p class="user-details">${userName}</p>`;

    // Create email element
    const emailElement = document.createElement("div");
    emailElement.classList.add("email-col");
    emailElement.innerHTML = `<p class="user-details">${userEmail}</p>`;

    // Create icon with delete button
    const icon = document.createElement("span");
    icon.classList.add("icon");
    icon.style = "display: inline-block";
    
    if (userName !== "admin") {
        const deleteBtn = document.createElement("button");
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            removeUser(userName);
        };
        deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon"></i>';
        icon.appendChild(deleteBtn);
    }

    // Create password element
    const passwordElement = document.createElement("div");
    passwordElement.classList.add("password-col");
    
    const pwd = document.createElement("p");
    pwd.style = "width: 80%; display: inline-block";
    pwd.innerHTML = `<span class="user-details">${userPassword}</span>`;
    
    passwordElement.appendChild(pwd);
    passwordElement.appendChild(icon);

    // Append elements to their respective containers
    document.getElementById("Username").appendChild(user);
    document.getElementById("Email").appendChild(emailElement);
    document.getElementById("Password").appendChild(passwordElement);
}

// Function to remove a user
async function removeUser(userName) {
if (confirm("Are you sure you want to remove this user?")) {
    // If the user confirms, proceed with deletion
    remove(ref(db, "users/" + userName))
        .then(() => {
        alert("User Removed!");
        })
        .catch((error) => {
        console.error("Error removing member:", error);
        alert("An error occurred while removing the member.");
        });
    }
}

// Function to fetch and display user data
function fetchAndDisplayUserData() {
    const usersRef = child(ref(db), 'users');

    // Listen for changes in user data
    onValue(usersRef, (snapshot) => {
        // Clear existing data in the HTML
        document.getElementById("Username").innerHTML = "";
        document.getElementById("Email").innerHTML = "";
        document.getElementById("Password").innerHTML = "";
        document.getElementById("ave-username").innerHTML = "";
        document.getElementById('ave-time-spent').innerHTML = "";
        document.getElementById("ave-username").innerHTML = "";
        document.getElementById('ave-time-spent').innerHTML = "";
        checkLoginStatus()

        try {
            const data = snapshot.val();

            for (const key in data) {
                displayUserData(data[key].username, data[key].email, data[key].password);
                // displayAveTimeSpentForAUser(data[key].username)
            }
        } 
            catch (error) {
                console.error(error);
                
            throw error; 
        }
    })
}
// Call the function to fetch and display user data
fetchAndDisplayUserData();

document.getElementById("start-date").addEventListener('change', () => {
    const start = new Date(document.getElementById("start-date").value)
    const end = new Date(document.getElementById("end-date").value)
    start.setHours(0, 0, 0, 0)
    if (document.getElementById("end-date").value !== "" && start > end) {
        document.getElementById("start-date").value = ""
        document.getElementById("ave-username").innerHTML = "";
        document.getElementById("ave-time-spent").innerHTML = "";
        alert("Start date cannot be later than end date!")
    } 
    else if (start > new Date()){
        document.getElementById("start-date").value = ""
        document.getElementById("ave-username").innerHTML = "";
        document.getElementById("ave-time-spent").innerHTML = "";
        alert("Start date cannot be future date!")
    }
    else if (document.getElementById("start-date").value !== "" && document.getElementById("end-date").value !== ""){
        displayAveTimeSpent()
    }
})

document.getElementById("end-date").addEventListener('change', () => {
    const start = new Date(document.getElementById("start-date").value)
    const end = new Date(document.getElementById("end-date").value)
    start.setHours(0, 0, 0, 0)
    if (document.getElementById("start-date").value !== "" && start > end) {
        document.getElementById("end-date").value = ""
        alert("End date cannot be earlier than the start date!")
        document.getElementById("ave-username").innerHTML = "";
        document.getElementById("ave-time-spent").innerHTML = "";
    } 
    else if (document.getElementById("start-date").value !== "" && document.getElementById("end-date").value !== ""){
        displayAveTimeSpent()
    }
})

async function displayAveTimeSpent() {
    try {
        const snapshot = await get(ref(db, '/users'));
        const data = snapshot.val()

        for (const key in data) {
            displayAveTimeSpentForAUser(data[key].username)
        }
    } 
        catch (error) {
            console.error(error);
            
        throw error; 
    }
}

async function displayAveTimeSpentForAUser(user) {
    document.getElementById("ave-username").innerHTML = "";
    document.getElementById('ave-time-spent').innerHTML = "";
    const start = new Date(document.getElementById("start-date").value)
    const end = new Date(document.getElementById("end-date").value)

    const snapshot = await get(ref(db, "task/"))
    const tasks = snapshot.val()
    // let total = 0
    let user_total = 0
    for (const task in tasks) {
      const lt = JSON.parse(tasks[task].logtime) 
      for (const date in lt) {
        if (new Date(date) >= start && new Date(date) <= end){
            if (tasks[task].assignee === user){
                user_total += lt[date].total
            }
            // total += lt[date].total
        }
      } 
    }
    const ave = (((user_total) / (((end-start)/(1000*60) + 1440)))*24)
    const username = document.createElement("div");
    username.classList.add("user-col");
    username.innerHTML = `<p class="user-details">${user}</p>`;

    const icon = document.createElement("span");
    icon.classList.add("icon");
    icon.style = "display: inline-block";
    
    const chartBtn = document.createElement("button");
    chartBtn.onclick = (e) => {
        e.stopPropagation();
        contributionLog(user);
    };
    chartBtn.innerHTML = '<i class="fa fa-line-chart"></i>';
    icon.appendChild(chartBtn);

    const timeElement = document.createElement("div");
    timeElement.classList.add("time-col");
    
    const time = document.createElement("p");
    time.style = "width: 80%; display: inline-block";
    const hrs = Math.floor(ave);
    const mins = Math.round((ave - hrs) * 60);
    time.innerHTML = `<span class="user-details">${hrs}hrs ${mins}mins</span>`;
    
    timeElement.appendChild(time);
    timeElement.appendChild(icon);

    document.getElementById("ave-username").appendChild(username);
    document.getElementById("ave-time-spent").appendChild(time);
    document.getElementById("ave-time-spent").appendChild(icon);
}

// contribution log
const chartPopup = document.getElementById("chart-popup")
document.getElementById("close-chart-btn").addEventListener('click', () => {
    chartPopup.style.display = "none"
  })

async function contributionLog(user) {
    chartPopup.style.display = "block"
    const str_start = document.getElementById("start-date").value
    const str_end = document.getElementById("end-date").value
    const start = new Date(str_start)
    const end = new Date(str_end)

    const snapshot = await get(ref(db, "task/"))
    const tasks = snapshot.val()
    let retObj = {}
    let current = new Date(str_start)
    while (current <= end) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, '0');
        const day = String(current.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        retObj[formattedDate] = 0;
        current.setDate(current.getDate() + 1);
    }
    for (const task in tasks) {
      const lt = JSON.parse(tasks[task].logtime)
      for (const date in lt) {
        if (new Date(date) >= start && new Date(date) <= end){
            if (tasks[task].assignee === user){
                retObj[date] = lt[date].total / 60
            }
        }
      } 
    }
    const ctx = document.getElementById("contribution-log-chart").getContext("2d")
    if (Chart.getChart("contribution-log-chart")) {
      Chart.getChart("contribution-log-chart").destroy()
    }
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: Object.keys(retObj),
          datasets: [{
              label: 'Contribution Log',
              data: Object.values(retObj),
              borderColor: 'rgb(235, 52, 88)',
              fill: false
          }]
      },
      options: {
          scales: {
              x: {
                  type: 'time',
                  time: {
                      unit: 'day',
                      displayFormats: {
                          day: 'DD'
                      }
                  },
                  position: 'bottom',
                  title: {
                      display: true,
                      text: 'Date'
                  }
              },
              y: {
                  beginAtZero: true,
                  position: 'left',
                  title: {
                      display: true,
                      text: 'Hours'
                  }
              }
          }
      }
    })
  }
