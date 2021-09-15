

class ChatMensaje {

   constructor() {
      this.usuarios = [];
      this.mensajes = [];
   }

   get obtenerUsuarios() {
      return this.usuarios;
   }

   usuarioConectado( usuario ) {
      this.usuarios.push(usuario);
   }

   usuarioDesconectado( usuarioDesconectado ) {
      const index = this.usuarios.findIndex( usuario => {
         return usuario.email == usuarioDesconectado.email
      });

      if(index == -1) { return null }
         
      this.usuarios.splice(index, 1)
   }

   guardarMensaje(mensaje) {
         this.mensajes.push(mensaje)
   }

   obtenerUltimosMensajes() {
      if(this.mensajes.length >= 10) {
         const ultimos10 = this.mensajes.slice(this.mensajes.length - 10)
         return ultimos10;
      } else {
         return this.mensajes
      }
   }
}

module.exports = ChatMensaje;