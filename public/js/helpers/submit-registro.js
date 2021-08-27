import { peticionLoginRegistro} from "../ajax.js";
import {
  verificaEmail,
  verificaPassRepetido,
  verificaPasswod,
  verificApellido,
  verificaTelefono,
  verificaTerminos,
  verificNombre,
} from "./verificacion-registro.js";
import {
   $nombre,
   $apellido,
   $password,
   $email,
   $telefono,
   $containerPeticion,
   $parrafoPeticion,
   $repeatPassword,
   $checkbox,
   $loading
} from "./variables.js"



let datosRegistro = {
   nombre: '',
   apellido: '',
   password: '',
   email: '',
   telefono: 0,
}

async function evniarFormulario (e) {
   e.preventDefault();

   


   if(verificNombre() && verificApellido() && verificaPasswod() && verificaPassRepetido() && verificaEmail() && verificaTelefono() && verificaTerminos()) {

      datosRegistro.nombre = $nombre.value
      datosRegistro.apellido = $apellido.value
      datosRegistro.password = $password.value
      datosRegistro.email = $email.value
      datosRegistro.telefono = $telefono.value

      $nombre.disabled = true;
      $apellido.disabled = true;
      $password.disabled = true;
      $email.disabled = true;
      $telefono.disabled = true;
      $repeatPassword.disabled = true;
      $checkbox.disabled = true;

      $containerPeticion.style = "transform: scale(0)"; 
      $loading.style = "transform: scale(1)";

      // Envia la URL y espera a la resolucion de la peticion
      const { estado, respuesta } = await peticionLoginRegistro(datosRegistro, "/api/usuarios/")

      // Habilita el DIV con el mensaje
      $loading.style = "transform: scale(0)";
      $containerPeticion.style = "transform: scale(1)";

      // Si la peticion es 400, evnina el DIV de error, sino envia el DIV de succes
      if (estado === 400) {
         $parrafoPeticion.textContent = respuesta.errors[0].msg
         $parrafoPeticion.classList.add("parrafo-peticion-error");
         $containerPeticion.classList.add("container-peticion-error");
         $parrafoPeticion.classList.remove("parrafo-peticion-succes");
         $containerPeticion.classList.remove("container-peticion-succes");
         
      } else {
         $parrafoPeticion.textContent = respuesta.msg;
         $parrafoPeticion.classList.add("parrafo-peticion-succes");
         $containerPeticion.classList.add("container-peticion-succes");
         $parrafoPeticion.classList.remove("parrafo-peticion-error");
         $containerPeticion.classList.remove("parrafo-peticion-error");


         $nombre.value = '';
         $apellido.value = '';
         $password.value = '';
         $email.value = '';
         $telefono.value = '';
         $repeatPassword.value = '';
         $checkbox.value = '';
         
      }

      $nombre.disabled = false;
      $apellido.disabled = false;
      $password.disabled = false;
      $email.disabled = false;
      $telefono.disabled = false;
      $repeatPassword.disabled = false;
      $checkbox.disabled = false;

      // ocultaMensaje();
   }

};

function ocultaMensaje() {
   setTimeout(() => {
     $containerPeticion.style = "transform: scale(0)"; 
   }, 4000);
}

export {
   evniarFormulario
}