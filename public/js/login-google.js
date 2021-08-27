
var url_POST = window.location.host.includes("localhost")
  ? "http://localhost:8080/api/auth/google"
  : "https://rest-server-panificadora.herokuapp.com/api/auth/google";


var iniciado;
var mismaPersona;


// Funcion que nos da google para iniciar y crear el token
function onSignIn(googleUser) {
   var profile = googleUser.getBasicProfile();

   mismaPersona = profile.getId()
   iniciado = true;

  var id_token = googleUser.getAuthResponse().id_token;

  var data = { id_token };

  // hace la peticion post con el token creado por google
  fetch(url_POST, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("Recibimos el token\n", data)
      localStorage.setItem('token', data.token)      
      })
    .catch((err) => console.log("Error en la peticion", err));
};


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });

  iniciado = false;
}

function onSuccess(googleUser) {
   signOut();
   var profile = googleUser.getBasicProfile();

   if(!iniciado) {
      onSignIn(googleUser)
   }

   if(profile.getId() != mismaPersona) {
      onSignIn(googleUser)
   }
}

function onFailure(error) {
  console.log(error);
}

// Funcion que renderiza un estilo de boton azul
function renderButton() {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
}
