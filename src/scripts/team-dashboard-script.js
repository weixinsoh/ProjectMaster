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