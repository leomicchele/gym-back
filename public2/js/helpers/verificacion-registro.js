import { 
   $nombre,
   $apellido,
   $password,
   $repeatPassword,
   $email,
   $telefono,
   $checkbox,
   $nombreError,
   $apellidoError,
   $passwordError,
   $repeatPasswordError,
   $emailError,
   $telefonoError,
   $checkboxError,
   expresiones
 } from './variables.js'



function verificNombre(e) {

   if(!expresiones.nombre_apellido.test($nombre.value)){
      $nombre.classList.remove('input-correcto')
      $nombre.classList.add('input-incorrecto')
      $nombreError.style = 'display: block'
      return false
   } else {
      $nombre.classList.remove('input-incorrecto')
      $nombre.classList.add('input-correcto')
      $nombreError.style = 'display: none'
      return true
   }
};

function verificApellido(e) {

   if(!expresiones.nombre_apellido.test($apellido.value)){
      $apellido.classList.remove('input-correcto')
      $apellido.classList.add('input-incorrecto')
      $apellidoError.style = 'display: block'
      return false
   } else {
      $apellido.classList.remove('input-incorrecto')
      $apellido.classList.add('input-correcto')
      $apellidoError.style = 'display: none'
      return true
   }
};


function verificaPasswod(e) {
   
   if(expresiones.password.test($password.value)) {
      $password.classList.add('input-correcto');
      $password.classList.remove('input-incorrecto');
      $passwordError.style = 'display: none'
      return true
   } else {
      $password.classList.remove('input-correcto');
      $password.classList.add('input-incorrecto');
      $passwordError.style = 'display: block'
      return false
   }
}

function verificaPassRepetido(e) {   
   if($password.value == $repeatPassword.value) {
      $repeatPassword.classList.add('input-correcto');
      $repeatPassword.classList.remove('input-incorrecto');
      $repeatPasswordError.style = 'display: none'
      return true
   } else {
      $repeatPassword.classList.remove('input-correcto');
      $repeatPassword.classList.add('input-incorrecto');
      $repeatPasswordError.style = 'display: block'
      return false
   }
}

function verificaEmail(e) {
   if(expresiones.correo.test($email.value)) {
      $email.classList.add('input-correcto');
      $email.classList.remove('input-incorrecto');
      $emailError.style = 'display: none'
      return true
   } else {
      $email.classList.remove('input-correcto');
      $email.classList.add('input-incorrecto');
      $emailError.style = 'display: block'
      return false
   }
};

function verificaTelefono(e) {
   if(expresiones.telefono.test($telefono.value)) {
      $telefono.classList.add('input-correcto');
      $telefono.classList.remove('input-incorrecto');
      $telefonoError.style = 'display: none'
      return true
   } else {
      $telefono.classList.remove('input-correcto');
      $telefono.classList.add('input-incorrecto');
      $telefonoError.style = 'display: block'
      return false
   }
}

function verificaTerminos(e) {

   if($checkbox.checked) {
      $checkboxError.style = 'display: none'
      return true
   } else {
      $checkboxError.style = 'display: block'
      return false
   }   
};

export {
  verificNombre,
  verificApellido,
  verificaEmail,
  verificaPasswod,
  verificaPassRepetido,
  verificaTelefono,
  verificaTerminos,
};