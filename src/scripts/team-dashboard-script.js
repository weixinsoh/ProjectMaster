import { confirmLogout, checkLoginStatus } from "./util.js";

checkLoginStatus()

document.getElementById("logout-link").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  confirmLogout(); // Show the confirmation dialog
});