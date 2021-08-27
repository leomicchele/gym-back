
import {
   verificacionPassword,
   verificacionEmail
 } from "./helpers/verificacion-login.js";
 import {
   $password,
   $username,
   $login,
 } from "./helpers/variables.js"
import { submitLogin } from "./helpers/submit-login.js";



// Funcion que escucha eventos
escuchandoEventos();
function escuchandoEventos() {
  $username.addEventListener("blur", verificacionEmail);
  $password.addEventListener("blur", verificacionPassword);
  $login.addEventListener('click', submitLogin);
  $login.addEventListener('submit', submitLogin);
};

window.addEventListener('DOMContentLoaded', () => {
  const $botonGoogleContainer = document.querySelector('.g-signin2')  
  const $botonGoogle = document.querySelector('.abcRioButton')  

  $botonGoogleContainer.style.transition = 'all ease 0.3s'
  $botonGoogleContainer.style = 'width: 100%;'

  $botonGoogle.style.transition = 'all ease 0.3s'
  $botonGoogle.style = 'max-width: 320px;'
})

