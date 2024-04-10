import { $containerPeticion, $parrafoPeticion, $password, $username } from "./variables.js";

// Muestra Elemento html de error
function mensajeError(mensaje) {
   $containerPeticion.style.transform = "scale(1)";  

   $parrafoPeticion.textContent = mensaje

   $parrafoPeticion.classList.add("parrafo-peticion-error");
   $containerPeticion.classList.add("container-peticion-error");
   $parrafoPeticion.classList.remove("parrafo-peticion-succes");
   $containerPeticion.classList.remove("container-peticion-succes");

   // Habilita los campos
   $username.disabled = false;
   $password.disabled = false;
};

// Muestra Elemento html de success
function mensajeSuccess(mensaje) {
   $containerPeticion.style.transform = "scale(1)";

   $parrafoPeticion.textContent = mensaje;

   $parrafoPeticion.classList.add("parrafo-peticion-succes");
   $containerPeticion.classList.add("container-peticion-succes");
   $parrafoPeticion.classList.remove("parrafo-peticion-error");
   $containerPeticion.classList.remove("container-peticion-error");
}

export {
   mensajeError,
   mensajeSuccess
}