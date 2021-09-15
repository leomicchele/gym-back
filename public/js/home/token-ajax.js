import {chatSocket} from './chat.js'

let token;

async function validarJWT() {
   token = localStorage.getItem('token')

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

   const $containerPerfil = document.querySelector('#perfil')
   const $containerChat = document.querySelector('#chat')
   const $containerSesion  = document.querySelector('.container-cerrar-sesion')
   const $botonChat  = document.querySelector('#boton-chat')
   
   const $imagen = document.querySelector('#img-foto');
   const $nombre = document.querySelector('#nombre');
   const $email = document.querySelector('#email');
   const $telefono = document.querySelector('#telefono');   

   $containerPerfil.style.display = 'flex';

   if(data.rol !== 'ADMIN_ROL') {
      $botonChat.style.display = 'none';
   }

   console.log(data)

   $containerSesion.style.display = 'block';
   
   (!data.img) ? $imagen.src = '../../assets/no-image.jpg' : $imagen.src = data.img
   $nombre.innerHTML = `${data.nombre} ${data.apellido}`
   $email.innerHTML = `Email: ${data.email}`
   $telefono.innerHTML = `Telefono: ${data.telefono}`

   socketConection(token, data);
}

function socketConection( token, data ) {
   // Envia el token para validarlo
   const socket = io({
      'extraHeaders': {
         "x-token": token
      }
   })

   if(data.rol === 'ADMIN_ROL') {
      chatSocket(socket, data)
   }
}

validarJWT()
