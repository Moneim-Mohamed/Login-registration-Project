// ** Html Elements
var emailInput = document.querySelector("#emailInput");
var passwordInput = document.querySelector("#passwordInput");
var sign = document.querySelector(".sign");
var newName = document.querySelector("#name");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var message = document.querySelector("#message");
var signIn = document.querySelector(".signIn");

var registInputs = document.querySelectorAll("#signupForm input");
var emailError = document.querySelector("#emailError");
var messageLogin = document.querySelector("#messageLogin");
var btnLogin = document.querySelector("#btnLogin");

// ************************ Variables
var nameRegex = /^[a-zA-Z\s]+$/;
var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
var passwordRegex = /^(?=.*\d)[A-Za-z\d]{7,}$/;
var arrayList = JSON.parse(localStorage.getItem("informations")) || [];


// *********************** Functions
function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

function showError() {
  message.innerHTML = "All inputs are required";
}


// ************************ Events
sign.addEventListener("click", function () {  
  if (newName.value === "" || email.value === "" || password.value === "") {
    showError();
    message.classList.add("text-danger");
    message.classList.remove("text-success");
    return;
  }
  if (
    !validate(nameRegex, newName) ||
    !validate(emailRegex, email) ||
    !validate(passwordRegex, password)
  ) {
    return;
  }

  var info = {
    name: newName.value,
    email: email.value,
    password: password.value,
  };

  var emailCheck = false;
  for (var i = 0; i < arrayList.length; i++) {
    if (arrayList[i].email.trim().toLowerCase() === email.value.trim().toLowerCase()) {
      emailCheck = true;
      break;
    }
  }

  if (emailCheck) {
    message.innerHTML = "Email already exists";
    message.classList.add("text-danger");
    message.classList.remove("text-success");
  } else {
    arrayList.push(info);
    localStorage.setItem("informations", JSON.stringify(arrayList));
    newName.value = "";
    email.value = "";
    password.value = "";
    message.innerHTML = "Success";
    message.classList.remove("text-danger");
    message.classList.add("text-success");
    document.location.href ="./login.html"
  }
});

// ^^^^^^^^^^^^^^^^^^
for (var i = 0; i < registInputs.length; i++) {
  registInputs[i].addEventListener("input", function (e) {
    var currentInput = e.target;

    if (currentInput.id === "name") {
      validate(nameRegex, currentInput);
    } else if (currentInput.id === "email") {
      validate(emailRegex, currentInput);
    } else if (currentInput.id === "password") {
      validate(passwordRegex, currentInput);
    }
  });
}

// ^^^^^^^^^^^^^^^^^^^
btnLogin.addEventListener("click", function () {
  if (emailInput.value === "" || passwordInput.value === "") {
    showError();
    return;
  }

  var loginSuccess = false;
  for (var i = 0; i < arrayList.length; i++) {
    if (
      arrayList[i].email === emailInput.value &&
      arrayList[i].password === passwordInput.value
    ) {
      loginSuccess = true;
      localStorage.setItem("currentUser", JSON.stringify(arrayList[i]));
      window.location.href = "./index.html"; 
      break;
    }
  }

  if (!loginSuccess) {
    messageLogin.innerHTML ="Incorrect email or password";
    messageLogin.classList.add("text-danger");
    messageLogin.classList.remove("text-success");
  }
});

