// Referencias HTML
const $botonAbrir = document.querySelector('#boton-chat')
const $contenedorPerfil = document.querySelector('#perfil')
const $contenedorChat = document.querySelector('#chat')

const $textId = document.querySelector('#textId');
const $textMensaje = document.querySelector('#textMensaje');
const $listaChat = document.querySelector('#listaChat');
const $listaUsuarios = document.querySelector('#listaUsuarios');

let datosUsuario;



export function chatSocket(socket, data) {

   datosUsuario = data;

   $botonAbrir.addEventListener('click', () => {
      $contenedorPerfil.style.display = 'none'
      $contenedorChat.style.display = 'flex'      
      socket.emit('lista-usuarios')
   })
   
   // escuchando
   socket.on('lista-usuarios', listarUsuariosHTML)

   socket.on('connect', () => {
      console.log('Estas conectado');
   })
   
   socket.on('saludando', (payload) => {
      console.log(payload)
   })

   socket.on('recibir-mensaje', listarMensajes)

   // Emitiendo
   $textMensaje.addEventListener('keyup', (event) => {
      const tecla = event.keyCode
      let mensaje = $textMensaje.value.trimStart()
      const destinatario = $textId.value.trimStart()

      if(tecla !== 13) { return }
      if(mensaje.length <= 0) { return }
      if(mensaje == '' || mensaje == ' ') { return }

      socket.emit('enviando-mensje', {mensaje, destinatario})

      $textMensaje.value = ''

   })

}


function listarUsuariosHTML( usuarios = [] ) {
   let itemHTML = '';

   usuarios.forEach(user => {
      itemHTML += `
         <li class="item-lista">         
            <h4>${user.nombre} ${user.apellido}</h4>
            <p>${user.email}</p>
         </li>      
      `
   })

   $listaUsuarios.innerHTML = itemHTML;
}

function listarMensajes( mensajes ) {

   console.log(mensajes)
   
   let mensajesHTML = '';

   mensajes.forEach( mensaje => {

      let nombre = mensaje.usuario.nombre;
      let apellido = mensaje.usuario.apellido;
      let estiloCSS = '';

      if(mensaje.usuario.email === datosUsuario.email) {
         nombre = 'Tú';
         apellido = ''
         estiloCSS = 'tu-mismo'
      }

      mensajesHTML += `
         <li class="item-lista lista-container-mensaje">         
            <span class="mensajes_nombre ${estiloCSS}">${nombre} ${apellido}: </span>
            <span class="mensaje_mensaje">${mensaje.mensaje}</span>
         </li> 
      ` 
   })

   $listaChat.innerHTML = mensajesHTML;

}