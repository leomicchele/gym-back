const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')


async function validarJWT(req, res, next) {

   const tokenUsuario = req.header('x-token')

   // Verifica si el token viene vacio
   if(!tokenUsuario) {
      return res.status(401).json({
         msg: 'El token debe ser enviado'
      })   
   }

   // Verifica si el toquen es valido
   try {
      const payload = jwt.verify(tokenUsuario, process.env.CLAVE_FIRMA)

      const usuarioAutenticado = await Usuario.findById( payload.id )

      // Verifica si el usuario existe en la base de datos
      if( !usuarioAutenticado ) {
         return res.status(401).json({
            msg: 'El usuario no existe en la Base de datos'
         })
      }

      // Verifica si el usuario esta dado de baja
      if( !usuarioAutenticado.estado ) {
         return res.status(401).json({
            msg: 'El usuario esta dado de baja'
         })
      }

      req.usuario = usuarioAutenticado // Agregamos a la req la propiedad .usuario para usarla en los controladores
      next()
            
   } catch (error) {
      // si el jwt.verify no pasa, cae en e catch
      res.status(401).json({
         msg: 'El token no es valido'
      })
   }
};


module.exports = {
   validarJWT
}