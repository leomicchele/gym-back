const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const Profesor = require('../models/profesor');
const Gimnasio = require('../models/gimnasio');


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


      // const usuarioAutenticado = await Usuario.findById( payload.id )
      const usuarioAutenticado = await Promise.all([
         Profesor.findById( payload.id ),
         Gimnasio.findById( payload.id ),
      ])

      // Verifica si el usuario existe en la base de datos
      if( !usuarioAutenticado[0] && !usuarioAutenticado[1]) {
         return res.status(401).json({
            msg: 'El usuario no existe en la Base de datos'
         })
      }

      // Verifica si el usuario esta dado de baja
      if( !usuarioAutenticado[0]?.estado && !usuarioAutenticado[1]?.estado && !usuarioAutenticado[2]?.estado) {
         return res.status(401).json({
            msg: 'El usuario esta dado de baja'
         })
      }

      req.usuario = usuarioAutenticado // Agregamos a la req la propiedad .usuario para usarla en los controladores
      console.log(req.usuario)
      next()
            
   } catch (error) {
      // si el jwt.verify no pasa, cae en e catch
      console.log({error})
      res.status(401).json({
         msg: 'El token no es valido'
      })
   }
};


module.exports = {
   validarJWT
}