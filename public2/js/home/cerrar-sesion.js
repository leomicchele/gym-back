const $botonCerrar = document.querySelector('#cerrar-sesion');

$botonCerrar.addEventListener('click', (event) => {
   event.preventDefault();
   localStorage.removeItem("token")
   window.location.href = window.location.origin
})

