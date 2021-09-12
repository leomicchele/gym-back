

async function validarJWT() {
   const token = localStorage.getItem('token')

   const resp = await fetch(window.location.href, {
      method: 'POST',
      headers: {
         "x-token": token
      }
   })

   // Si falla la peticion nos redirige al login
   if(!resp.ok) {
      window.location.href = window.location.origin
      console.log('No se puede entrar')
   }

   // Obtenemos los datos y lo mostramos en pantalla
   const data = await resp.json();
   pintarHTML(data);
}

function pintarHTML(data) {
   // Referencia HTML

   const $container = document.querySelector('.container')
   const $containerSesion  = document.querySelector('.container-cerrar-sesion')
   
   const $imagen = document.querySelector('#img-foto');
   const $nombre = document.querySelector('#nombre');
   const $email = document.querySelector('#email');
   const $telefono = document.querySelector('#telefono');   

   

   $container.style.display = 'flex';
   $containerSesion.style.display = 'block';
   
   (!data.img) ? $imagen.src = '../../assets/no-image.jpg' : $imagen.src = data.img
   $nombre.innerHTML = `${data.nombre} ${data.apellido}`
   $email.innerHTML = `Email: ${data.email}`
   $telefono.innerHTML = `Telefono: ${data.telefono}`

   
   
}

validarJWT()