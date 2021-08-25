import { peticionLoginRegistro} from '../ajax.js';
import {
   verificacionPassword,
   verificacionEmail
 } from "./verificacion-login.js";
 import {
   $password,
   $parrafoPeticion,
   $containerPeticion,
   $username,
 } from "./variables.js"


let datosUsuario = {
   email: '',
   password: ''
}

async function submitLogin(event) {
   event.preventDefault();
   const emailCorrecto = verificacionEmail();
   const passwordCorrecto = verificacionPassword();
 
   if (emailCorrecto && passwordCorrecto) {
 
    datosUsuario.email = $username.value;
    datosUsuario.password = $password.value;
 
    // Envia la URL y espera a la resolucion de la peticion
    const { estado, respuesta } = await peticionLoginRegistro(datosUsuario, "/api/auth/login");
 
    // Habilita el DIV con el mensaje
    $containerPeticion.style = "display: block";
 
    // Si la peticion es 400, evnina el DIV de error, sino envia el DIV de succes
    if (estado === 400) {
       $parrafoPeticion.textContent = "El email o la contraseña no son validos";
       $parrafoPeticion.classList.add("parrafo-peticion-error"); 
       $containerPeticion.classList.add("container-peticion-error");

       $parrafoPeticion.classList.remove("parrafo-peticion-succes"); 
       $containerPeticion.classList.remove("container-peticion-succes");
    } else {
       $parrafoPeticion.textContent = respuesta.msg;
       $parrafoPeticion.classList.add("parrafo-peticion-succes"); 
       $containerPeticion.classList.add("container-peticion-succes");

       $parrafoPeticion.classList.remove("parrafo-peticion-error"); 
       $containerPeticion.classList.remove("container-peticion-error");
    }
   }
 };

 export {
   submitLogin
 }