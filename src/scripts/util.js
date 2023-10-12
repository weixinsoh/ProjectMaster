export { displayNavItem, getPriorityColor, getTagColor }


async function displayNavItem() {
    try {
      // const snapshot = await get(child(ref(db, 'user/'), `/${receivedID}`));
      // const user = snapshot.val();
  
      const privilege = document.getElementById("privilege")
      privilege.innerHTML = ""
      const hyperLink = document.createElement("a")
      hyperLink.classList.add("nav-link")
      let hyperLinkURL = "", hyperLinkText = ""
      /*
      if (user.role === "admin") {
        hyperLinkURL = "admin-view.html"
        hyperLinkText = "Admin View"
      } else {
        hyperLinkURL = "team-dashboard.html"
        hyperLinkText = "Team Dashboard"
      }
      */
      hyperLink.setAttribute("href", hyperLinkURL)
      hyperLink.innerHTML = hyperLinkText
      privilege.appendChild(hyperLink)
  
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  function logout(auth) {
    signOut(auth).then(() => {
      getCurrentlySigninUser(auth)
    }).catch((error) => {
      alert(error)
    });
  }

  function getCurrentlySignInUser(auth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        window.open("product-backlog.html", '_self')
      } else {
        // User is signed out
        window.open("login-page.html", '_self')
      }
    });
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