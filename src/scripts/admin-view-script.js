// example 
const card = document.createElement("div")
card.classList.add("task-card") 
card.innerHTML = `
<p class="task-tags">
  123
</p>
<p class="task-tags">
  456
</p>
<p class="task-tags">
  789
</p>
`
document.getElementById("Username").appendChild(card);

//  Add a confirmation dialog to ensure users want to log out before proceeding
function confirmLogout() {
  const confirmDialog = confirm("Are you sure you want to log out?");
  if (confirmDialog) {
    // If the user confirms, proceed with the logout
    window.location.href = "login-page.html"; // Redirect to the login page
  }
}

document.getElementById("logout-link").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  confirmLogout(); // Show the confirmation dialog
});