const { validaJWT } = require("../helpers/validar-jwt-socket");
const ChatMensaje = require("../models/socket-class");
// const chatMensaje = require('../models/socket-class');

const chatMensaje = new ChatMensaje();


async function socketController( socket ) {

   // El token viene en esta ruta
   const tokenRecibido = socket.handshake.headers['x-token']

   // Verificamos el token recibido
   const usuario = await validaJWT( tokenRecibido );

   // Si el usuario no existe, desconecta el socket
   if(!usuario) {
      socket.disconnect()
   }

   // Guardamos el nuevo usuario conectado
   chatMensaje.usuarioConectado( usuario )

   // Obtenemos todos los usuarios conectados
   let usuarios = chatMensaje.obtenerUsuarios;

   // Emitimos a todos el listado de usuarios
   socket.broadcast.emit('lista-usuarios', usuarios)
   socket.emit('lista-usuarios', usuarios)

   // Emitimos todos los ultimos mensajes del chat
   const ultimos10 = chatMensaje.obtenerUltimosMensajes();
   socket.emit('recibir-mensaje', ultimos10)
   socket.broadcast.emit('recibir-mensaje', ultimos10)

   // Emitimos a todos el listado de usuarios cuando es solicitado desde el cliente
   socket.on('lista-usuarios', () => {
      socket.broadcast.emit('lista-usuarios', usuarios)
      socket.emit('lista-usuarios', usuarios)
   })

   // Si se desconecta alguien, lo sacamos del listado
   socket.on('disconnect', () => {
     console.log("Socket desconectado");
     chatMensaje.usuarioDesconectado(usuario);
     
     usuarios = chatMensaje.obtenerUsuarios; // Obtenemos todos los usuarios conectados
     
     socket.broadcast.emit("lista-usuarios", usuarios); // Emitimos a todos el listado de usuarios
   })

   socket.on('enviando-mensje', (payload) => {
      chatMensaje.guardarMensaje( {
         mensaje: payload.mensaje,
         usuario: usuario,
         destinatario: payload.destinatario
      } )

      const ultimos10 = chatMensaje.obtenerUltimosMensajes();
      socket.emit('recibir-mensaje', ultimos10)
      socket.broadcast.emit('recibir-mensaje', ultimos10)
   })

   // Enviamos a todos quien se conecto
   socket.broadcast.emit('saludando',`Se conecto ${usuario.nombre} ${usuario.apellido}`)

}

module.exports = {
   socketController
}