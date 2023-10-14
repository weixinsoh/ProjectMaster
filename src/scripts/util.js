export { displayNavItem, getPriorityColor, getTagColor, confirmLogout, checkLoginStatus, toggleTheme }
import { ref, get, child} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

async function displayNavItem(db) {
    try {
      checkLoginStatus()
      const username = localStorage.getItem('username')
      const snapshot = await get(child(ref(db, 'users/'), `/${username}`));
      const user = snapshot.val();

      const access = document.getElementById("access")
      access.innerHTML = ""
      const hyperLink = document.createElement("a")
      hyperLink.classList.add("nav-link")
      let hyperLinkURL = "", hyperLinkText = ""

      if (user.role === "administrator") {
        hyperLinkURL = "admin-view.html"
        hyperLinkText = "Admin View"
      } else {
        hyperLinkURL = "team-dashboard.html"
        hyperLinkText = "Team Dashboard"
      }

      hyperLink.setAttribute("href", hyperLinkURL)
      hyperLink.innerHTML = hyperLinkText
      access.appendChild(hyperLink)
  
    } catch (error) {
      console.error(error);
      throw error; 
    }
}

function checkLoginStatus() {
  if (!localStorage.getItem('username')) {
    alert("Login to access the tools!")
    window.open('login-page.html', '_self')
  }
}

  //  Add a confirmation dialog to ensure users want to log out before proceeding
function confirmLogout() {
  const confirmDialog = confirm("Are you sure you want to log out?");
  if (confirmDialog) {
    // If the user confirms, proceed with the logout
    localStorage.removeItem('username');
    window.location.href = "login-page.html"; // Redirect to the login page
  }
}

function toggleTheme(theme) {
  const body = document.body;
  body.classList = ""
  body.classList.add(theme)
  console.log(body.classList)
}

  function getTagColor(tag) {
    switch (tag) {
      case "Frontend":
        return "mediumpurple"
      case "Backend":
        return "pink"
      case "API":
        return "lightblue"
      case "Testing":
        return "rgba(0, 102, 255, 0.67)"
      case "Framework":
        return "tan"
      case "UI":
        return "rgba(255, 170, 134)"
      case "UX":
        return "silver"
      case "Database":
        return "aquamarine"
    }
  }
  
  function getPriorityColor(priority) {
    switch (priority) {
      case "Urgent":
        return "#F65B51"
      case "Important":
        return "lightsalmon"
      case "Medium":
        return "#FFFA84"
      case "Low":
        return "lightgreen"
    }
  }