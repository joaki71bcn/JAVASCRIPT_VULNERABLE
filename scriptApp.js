"use strict";

// Pongo foco directamente en username
let userBox = document.getElementById("username");
userBox.focus();

async function validateLogin() {
  // asigno variables que recogo de formulario para validacion
  const usernameValue = document.getElementById("username").value;
  const passwordValue = document.getElementById("password").value;
  const mensajeError = document.getElementById("errorUsuario");

  // Validaciones user y pwd
  if (!usernameValue || !passwordValue) {
    mensajeError.textContent = "Introduce usuario y password";
    return;
  } else if (passwordValue.length < 4) {
    mensajeError.textContent = "Password ha de tener un mínimo de 4 caracteres";
    return;
  }

  // creo objeto que almacena user y pwd
  const datosUsuario = {
    username: usernameValue,
    password: passwordValue,
  };

  try {
    // envía la petición POST al servidor
    const response = await fetch("http://192.168.15.150:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    });

    if (response.ok) {
      console.log("Usuario existe");
      // setUserCookie(usernameValue);
      // quitar la opacidad de la parte de abajo de la aplicacion
      // window.location.href = "/secondScreen.html"; // pdte cambiar
      // el .global-container donde pondremos pintaremos la aplicacion
    } else if (response.status === 401) {
      mensajeError.textContent = "Credenciales incorrectas";
    } else {
      // Si la respuesta no es exitosa mostrar error
      mensajeError.textContent =
        "Error al iniciar sesión: " + response.statusText;
    }
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}
