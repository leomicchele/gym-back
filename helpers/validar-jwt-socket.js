const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

async function validaJWT( token ) {

   if(token.length < 10) {
      return null
   }
   
   const payload = jwt.verify(token, process.env.CLAVE_FIRMA);
   
   const usuario = await Usuario.findById(payload.id);
   
   if(usuario) {
      if(!usuario.estado) {
         return null
      }
      return usuario;
   } else {
      return null
   }

}

module.exports = {
   validaJWT
}