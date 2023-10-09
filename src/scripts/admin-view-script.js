// example 

document.getElementById("Username").innerHTML = "";
document.getElementById("Email").innerHTML = "";
document.getElementById("Password").innerHTML = "";

const user = document.createElement("div")
user.classList.add("user-col") 
const usernameExample = "teammember1"
user.innerHTML = `<p class="user-details" style="padding-top: 3px; padding-bottom: 2px"">${usernameExample}</p>`

const email = document.createElement("div")
email.classList.add("email-col") 
const emailExample = "teammember001@gmail.com"
email.innerHTML = `<p class="user-details" style="padding-top: 3px; padding-bottom: 2px">${emailExample}</p>`

const icon = document.createElement("span")
icon.classList.add("icon")
icon.style = "display: inline-block";
const deleteBtn = document.createElement("button")
deleteBtn.onclick = (e) => {
    e.stopPropagation()
    removeTask(data.name)} // data = ?
deleteBtn.innerHTML = '<i class="fas fa-trash dlt-icon"></i>';
icon.appendChild(deleteBtn);

const password = document.createElement("div");
password.classList.add("password-col");
const pwd = document.createElement("p");
pwd.style = "width: 80%; display: inline-block ";
const passwordExample = "password1"
pwd.innerHTML = `<span class="user-details"">${passwordExample}</span>`
;

password.appendChild(pwd);
password.appendChild(icon);


document.getElementById("Username").appendChild(user);
document.getElementById("Email").appendChild(email);
document.getElementById("Password").appendChild(password);

// delete features
async function removeTask(value){
    
}


// just for testing
const user2 = document.createElement("div")
user2.classList.add("user-col") 
const usernameExample2 = "teammember2"
user2.innerHTML = `<p class="user-details">${usernameExample}</p>`

const email2 = document.createElement("div")
email2.classList.add("email-col") 
const emailExample2 = "temmember002@gmail.com"
email2.innerHTML = `<p class="user-details">${emailExample}</p>`

const icon2 = document.createElement("span")
icon2.classList.add("icon")
icon2.style = "display: inline-block";
const deleteBtn2 = document.createElement("button")
deleteBtn2.onclick = (e) => {
    e.stopPropagation()
    removeTask(data.name)} // data = ?
deleteBtn2.innerHTML = '<i class="fas fa-trash dlt-icon"></i>';
icon2.appendChild(deleteBtn2);

const password2 = document.createElement("div");
password2.classList.add("password-col");
const pwd2 = document.createElement("p");
pwd2.style = "width: 80%; display: inline-block";
const passwordExample2 = "password2"
pwd2.innerHTML = `<span class="user-details"">${passwordExample2}</span>`
;

password.appendChild(pwd2);
password.appendChild(icon2);


document.getElementById("Username").appendChild(user2);
document.getElementById("Email").appendChild(email2);
document.getElementById("Password").appendChild(password2);
