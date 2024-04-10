import {
   $password,
   $username,
   $parrafoUserError,
   $parrafoPasswordError,
   expresiones
 } from "./variables.js"


function verificacionEmail(event) {
   let valor = $username.value;

   if(expresiones.correo.test(valor)){
      $username.classList.add('input-correcto')
      $username.classList.remove('input-incorrecto')
      $parrafoUserError.style = 'display: none'
      return true
   } else {
      $username.classList.add('input-incorrecto');
      $username.classList.remove('input-correcto');      
      $parrafoUserError.style = 'display: block';

      return false
   }
};


function verificacionPassword(event) {
   let valor = $password.value;

   if(expresiones.password.test(valor)){
      $password.classList.add('input-correcto')
      $password.classList.remove('input-incorrecto')
      $parrafoPasswordError.style = 'display: none'
      return true

   } else {
      $password.classList.add('input-incorrecto')
      $password.classList.remove('input-correcto')
      $parrafoPasswordError.style = 'display: block';
      return false
   }
};

export {
   verificacionPassword,
   verificacionEmail
}