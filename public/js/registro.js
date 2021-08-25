import { evniarFormulario } from "./helpers/submit-registro.js";
import {
  verificaEmail,
  verificaPassRepetido,
  verificaPasswod,
  verificApellido,
  verificaTelefono,
  verificaTerminos,
  verificNombre,
} from "./helpers/verificacion-registro.js";
import {
   $nombre,
   $apellido,
   $password,
   $repeatPassword,
   $email,
   $telefono,
   $checkbox,   
   $enviar,
} from "./helpers/variables.js"

escuchandoEventos();
function escuchandoEventos() {
   $nombre.addEventListener('blur',verificNombre);
   $apellido.addEventListener('blur', verificApellido);
   $password.addEventListener('blur', verificaPasswod);
   $repeatPassword.addEventListener('blur', verificaPassRepetido);
   $email.addEventListener('blur', verificaEmail);
   $telefono.addEventListener('blur', verificaTelefono);
   $checkbox.addEventListener('blur', verificaTerminos);
   $enviar.addEventListener('submit', evniarFormulario);
   $enviar.addEventListener('click', evniarFormulario);
}