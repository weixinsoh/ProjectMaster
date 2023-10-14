import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { checkLoginStatus, toggleTheme } from "./util.js";

const firebaseConfig = {
apiKey: "AIzaSyACyBE4-v3Z5qL37njca-CaPUPXMHfzZbY",
authDomain: "fit2101-team4.firebaseapp.com",
databaseURL: "https://fit2101-team4-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "fit2101-team4",
storageBucket: "fit2101-team4.appspot.com",
messagingSenderId: "413420787548",
appId: "1:413420787548:web:be8873c231ec4468845399"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const reference = ref(db, 'users/');
checkLoginStatus()

onValue(ref(db, 'users/' + localStorage.getItem('username')), (snapshot) => {
    const data = snapshot.val();
    if (data['theme']) {
      toggleTheme(data['theme'])
    }
});

// Event listener for the "Back" button
document.getElementById('return-window-btn').addEventListener('click', () => {
    window.history.back(); 
});

document.getElementById("reset-password-btn").addEventListener('click', resetPassword)

function resetPassword() {
    const username = localStorage.getItem('username');
    const currentPasswordInput = document.getElementById('current-password');
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if the current password input field is empty
    if (currentPasswordInput.value.trim() === '') {
        alert("Please enter your current password.");
        return;
    }

    // Fetch the user's current data from Firebase
    const userRef = ref(db, 'users/' + username);
    get(userRef)
        .then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                const storedPassword = userData.password;

                if (currentPasswordInput.value === storedPassword) {
                    if (newPassword === confirmPassword) {
                        // Passwords match and the new password and confirmation match
                        // Update only the "password" field in Firebase, preserving other user data
                        userData.password = newPassword; // Update the password in the user data
                        set(userRef, userData)
                            .then(() => {
                                alert('Password updated successfully.');
                            })
                            .catch((error) => {
                                alert('Error updating password: ' + error.message);
                            });
                    } else {
                        alert('New password and confirmation do not match.');
                    }
                } else {
                    alert('Current password is incorrect.');
                }
            } else {
                alert('User not found.');
            }
        })
        .catch((error) => {
            alert('Error fetching user data: ' + error.message);
        });
}


