// asignaciones variables a elementos DOM
const username = document.getElementById("username");
const password = document.getElementById("password");

// variables para verificar usuarios en BBDD
const usernameBBDD = "";
const passwordBBDD = "";

// Login
function validateLogin() {
  if (username.value === usernameBBDD && password.value === passwordBBDD) {
    document.querySelector(".global-container").style.opacity = 0;
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}
