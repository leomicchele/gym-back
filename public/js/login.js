
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


