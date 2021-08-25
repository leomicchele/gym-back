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
   $parrafoPeticion
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

      // Envia la URL y espera a la resolucion de la peticion
      const { estado, respuesta } = await peticionLoginRegistro(datosRegistro, "/api/usuarios/")

      // Habilita el DIV con el mensaje
      $containerPeticion.style = "display: block";

      // Si la peticion es 400, evnina el DIV de error, sino envia el DIV de succes
      if (estado === 400) {
         $parrafoPeticion.textContent = respuesta.errors[0].msg
         $parrafoPeticion.classList.add("parrafo-peticion-error");

         $containerPeticion.classList.add("container-peticion-error");
      } else {
         $parrafoPeticion.textContent = respuesta.msg;
         $parrafoPeticion.classList.add("parrafo-peticion-succes");

         $containerPeticion.classList.add("container-peticion-succes");
      }
   }

};

export {
   evniarFormulario
}