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

// // example 
// document.getElementById("Username").innerHTML = "";
// document.getElementById("Email").innerHTML = "";
// document.getElementById("Password").innerHTML = "";

// const user = document.createElement("div")
// user.classList.add("user-col") 
// const usernameExample = "teammember1"
// user.innerHTML = `<p class="user-details" style="padding-top: 3px; padding-bottom: 2px"">${usernameExample}</p>`

// const email = document.createElement("div")
// email.classList.add("email-col") 
// const emailExample = "teammember001@gmail.com"
// email.innerHTML = `<p class="user-details" style="padding-top: 3px; padding-bottom: 2px">${emailExample}</p>`

// const icon = document.createElement("span")
// icon.classList.add("icon")
// icon.style = "display: inline-block";
// const deleteBtn = document.createElement("button")
// deleteBtn.onclick = (e) => {
//     e.stopPropagation()
//     removeTask(data.name)} // data = ?
// deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon"></i>';
// icon.appendChild(deleteBtn);

// const password = document.createElement("div");
// password.classList.add("password-col");
// const pwd = document.createElement("p");
// pwd.style = "width: 80%; display: inline-block ";
// const passwordExample = "password1"
// pwd.innerHTML = `<span class="user-details"">${passwordExample}</span>`
// ;

// password.appendChild(pwd);
// password.appendChild(icon);

// document.getElementById("Username").appendChild(user);
// document.getElementById("Email").appendChild(email);
// document.getElementById("Password").appendChild(password);

// // delete features
// async function removeTask(value){
    
// }

// //  Add a confirmation dialog to ensure users want to log out before proceeding
// function confirmLogout() {
//   const confirmDialog = confirm("Are you sure you want to log out?");
//   if (confirmDialog) {
//     // If the user confirms, proceed with the logout
//     window.location.href = "login-page.html"; // Redirect to the login page
//   }
// }

// document.getElementById("logout-link").addEventListener("click", function (event) {
//   event.preventDefault(); // Prevent the default link behavior
//   confirmLogout(); // Show the confirmation dialog
// });


// // ------------------------------------------------------------------------------------
// // just for testing -- same as above code -- can delete
// const user2 = document.createElement("div")
// user2.classList.add("user-col") 
// const usernameExample2 = "teammember2"
// user2.innerHTML = `<p class="user-details">${usernameExample}</p>`
// const email2 = document.createElement("div")
// email2.classList.add("email-col") 
// const emailExample2 = "temmember002@gmail.com"
// email2.innerHTML = `<p class="user-details">${emailExample}</p>`
// const icon2 = document.createElement("span")
// icon2.classList.add("icon")
// icon2.style = "display: inline-block";
// const deleteBtn2 = document.createElement("button")
// deleteBtn2.onclick = (e) => {
//     e.stopPropagation()
//     removeTask(data.name)} // data = ?
// deleteBtn2.innerHTML = '<i class="fas fa-trash dlt-icon"></i>';
// icon2.appendChild(deleteBtn2);
// const password2 = document.createElement("div");
// password2.classList.add("password-col");
// const pwd2 = document.createElement("p");
// pwd2.style = "width: 80%; display: inline-block";
// const passwordExample2 = "password2"
// pwd2.innerHTML = `<span class="user-details"">${passwordExample2}</span>`;
// password.appendChild(pwd2);
// password.appendChild(icon2);
// document.getElementById("Username").appendChild(user2);
// document.getElementById("Email").appendChild(email2);
// document.getElementById("Password").appendChild(password2);



// Example HTML structure
document.getElementById("Username").innerHTML = "";
document.getElementById("Email").innerHTML = "";
document.getElementById("Password").innerHTML = "";

// Function to display user data
function displayUserData(userName, userEmail, userPassword) {
    const user = document.createElement("div");
    user.classList.add("user-col");
    user.innerHTML = `<p class="user-details">${userName}</p>`;

    const emailElement = document.createElement("div");
    emailElement.classList.add("email-col");
    emailElement.innerHTML = `<p class="user-details">${userEmail}</p>`;

    const icon = document.createElement("span");
    icon.classList.add("icon");
    icon.style = "display: inline-block";
    
    const deleteBtn = document.createElement("button");
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        removeTask(userName); // Pass the userName as the data to removeTask function
    };
    deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon"></i>';
    icon.appendChild(deleteBtn);

    const passwordElement = document.createElement("div");
    passwordElement.classList.add("password-col");
    
    const pwd = document.createElement("p");
    pwd.style = "width: 80%; display: inline-block";
    pwd.innerHTML = `<span class="user-details">${userPassword}</span>`;
    
    passwordElement.appendChild(pwd);
    passwordElement.appendChild(icon);

    document.getElementById("Username").appendChild(user);
    document.getElementById("Email").appendChild(emailElement);
    document.getElementById("Password").appendChild(passwordElement);
}

// Function to remove a task (user) - you can implement this as needed
async function removeTask(userName) {
    // Implement the code to remove the user from the database
}

// Function to fetch user data from Firebase
function fetchUserData() {
    // Reference to the Firebase database
    const dbRef = ref(db);

    // Query to get all users
    const usersQuery = child(dbRef, 'users');

    // Listen for changes in the data
    onValue(usersQuery, (snapshot) => {
        // Clear the existing data in the HTML
        document.getElementById("Username").innerHTML = "";
        document.getElementById("Email").innerHTML = "";
        document.getElementById("Password").innerHTML = "";

        // Loop through each user
        snapshot.forEach((userSnapshot) => {
            const userData = userSnapshot.val();
            const { userName, userEmail, userPassword } = userData;

            // Display user data in the HTML
            displayUserData(userName, userEmail, userPassword);
        });
    });
}

// Call the function to fetch and display user data
fetchUserData();
