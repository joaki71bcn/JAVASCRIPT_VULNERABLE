// Login
function validateLogin() {
  // asigno variables que recogo de formulario para validacion
  let usernameValue = document.getElementById("username").value;
  let passwordValue = document.getElementById("password").value;
  let mensajeError = document.getElementById("errorUsuario");

  // Validaciones user y pwd
  if (!usernameValue || !passwordValue) {
    mensajeError.textContent = "Introduce usuario y password";
    // alert("Introduce usuario y password");

    return;
  } else if (passwordValue.length < 4) {
    // alert("Password menor de 4 caracteres");
    mensajeError.textContent = "Password menor de 4 caracteres";
    return;
  }

  // creo objeto que almacena user y pwd
  const datosUsuario = {
    username: usernameValue,
    password: passwordValue,
  };

  // convertir a json
  let jsonUsuario = JSON.stringify(datosUsuario);
  console.log(jsonUsuario);

  // configurar peticion ajax a mysql
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  // funcion para manejar la respuesta del servidor
  xhr.onload = function () {
    if (xhr.status === 200) {
      setUserCookie(usernameValue);
      // quitar la opacidad de la parte de abajo de la aplicacion
      window.localtion.href = "/secondScreen.html"; // pdte cambiar
      // el .global-container donde pondremos pintaremos la aplicacion
    } else {
      // Si la respuesta no es exitosa mostrar error
      // alert("Error al iniciar sesión" + xhr.responseText);
      mensajeError.textContent = "Error al iniciar sesión" + xhr.responseText;
    }
  };
  xhr.send(jsonUsuario);
}
