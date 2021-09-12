const $botonCerrar = document.querySelector('#cerrar-sesion');

$botonCerrar.addEventListener('click', () => {
   localStorage.removeItem("token")
   window.location.href = window.location.origin
})

