const $nombre = document.querySelector('#nombre');
const $apellido = document.querySelector('#apellido');
const $password = document.querySelector('#password');
const $repeatPassword = document.querySelector('#repeat-password');
const $email = document.querySelector('#email');
const $telefono = document.querySelector('#telefono');
const $checkbox = document.querySelector('#checkbox');
const $enviar = document.querySelector('#boton-enviar');

const $username = document.querySelector('#username');
const $login = document.querySelector('#boton-login');
const $parrafoUserError = document.querySelector('#parrafo-username-error');
const $parrafoPasswordError = document.querySelector('#parrafo-passwoord-error');

const $nombreError = document.querySelector('#parrafo-nombre-error');
const $apellidoError = document.querySelector('#parrafo-apellido-error');
const $passwordError = document.querySelector('#parrafo-passwoord-error');
const $repeatPasswordError = document.querySelector('#parrafo-repeat-passwoord-error');
const $emailError = document.querySelector('#parrafo-email-error');
const $telefonoError = document.querySelector('#parrafo-telefono-error');
const $checkboxError = document.querySelector('#parrafo-terminos-error');

const $parrafoPeticion = document.querySelector('#peticion-parrafo');
const $containerPeticion = document.querySelector('#container-peticion');
const $loading = document.querySelector("#loading");

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre_apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{6,14}$/, // 6 a 14 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ // Telefonos con caracteristica.
}

export {
   $nombre,
   $apellido,
   $password,
   $repeatPassword,
   $email,
   $telefono,
   $checkbox,
   $enviar,
   $nombreError,
   $apellidoError,
   $passwordError,
   $repeatPasswordError,
   $emailError,
   $telefonoError,
   $checkboxError,
   $parrafoPeticion,
   $containerPeticion,
   $username,
   $login,
   $parrafoUserError,
   $parrafoPasswordError,
   expresiones,
   $loading,
}

// export * from './variables' 