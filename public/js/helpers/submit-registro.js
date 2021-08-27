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
   $repeatPassword,
   $checkbox,
   $loading
} from "./variables.js"
import { mensajeError, mensajeSuccess } from "./mensaje-html.js";



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
      // $containerPeticion.style = "transform: scale(1)";

      // Si la peticion es 400, evnina el DIV de error, sino envia el DIV de succes
      if (estado === 400) {         
         mensajeError(respuesta.errors[0].msg)         
      } else {
         mensajeSuccess(respuesta.msg)         
      }
   }

};

export {
   evniarFormulario
}