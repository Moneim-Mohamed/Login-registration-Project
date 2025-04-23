// ** Html Element
var userName = document.querySelector(".userName");
var logOut = document.querySelector("#logOut")
// ** Variables
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
// ** Functions
function displayUserName() {
    if (currentUser && currentUser.name) {
      userName.innerHTML = currentUser.name;
    }
  }
// ** Events
document.addEventListener("DOMContentLoaded", function(){
    displayUserName();
    })
    logOut.addEventListener("click" , function(){
        document.location.href ="./login.html"
    })
    
