import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, get, child, onValue, update} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
    
    const deleteBtn = document.createElement("button");
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        removeUser(userName);
    };
    deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon"></i>';
    icon.appendChild(deleteBtn);

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

        // Loop through each user and display their data
        snapshot.forEach((userSnapshot) => {
            const userData = userSnapshot.val();
            if (userData) {
                const { userName, userEmail, userPassword } = userData;
                displayUserData(userName, userEmail, userPassword);
            }
        });
    });
}

// Call the function to fetch and display user data
fetchAndDisplayUserData();
