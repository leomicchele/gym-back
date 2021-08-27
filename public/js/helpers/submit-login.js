import { peticionLoginRegistro} from '../ajax.js';
import {
   verificacionPassword,
   verificacionEmail
 } from "./verificacion-login.js";
 import {
   $password,
   $containerPeticion,
   $username,
   $loading,
 } from "./variables.js"
import { mensajeError, mensajeSuccess } from './mensaje-html.js';


let datosUsuario = {
   email: '',
   password: ''
}

async function submitLogin(event) {
   event.preventDefault();

   const emailCorrecto = verificacionEmail();
   const passwordCorrecto = verificacionPassword();
 
   if (emailCorrecto && passwordCorrecto) {
      $username.disabled = true;
      $password.disabled = true;
 
      datosUsuario.email = $username.value;
      datosUsuario.password = $password.value;

      $containerPeticion.style.transform = "scale(0)";  
      $loading.style = "transform: scale(1)";
   
      // Envia la URL y espera a la resolucion de la peticion
      const { estado, respuesta } = await peticionLoginRegistro(datosUsuario, "/api/auth/login");
 
      // Habilita el DIV con el mensaje
      $loading.style = "transform: scale(0)";
       
      serverResponse(estado, respuesta)
   } 
 };

 // Si la peticion es 400, muestra elemento de error, sino succes
 function serverResponse(estado, respuesta) {

   if (estado === 400) {
      mensajeError("El email o la contraseña no son validos"); // muestra elemento HTML      
   } else {
      console.log(respuesta.token)      
      mensajeSuccess(respuesta.msg); // Muestra elemento HTML
   }
 }

 export {
   submitLogin
 }