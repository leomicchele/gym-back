
const bcrypt = require('bcrypt');
const { generadorJWT } = require('../helpers/generador-jwt');
const Usuario = require('../models/usuario')

async function login(req, res) {

   const { email, password } = req.body
   const usuario = await Usuario.findOne({ email: email }) 
   
   // Compara el password
   const passwordBool = bcrypt.compareSync(password, usuario.password);   
   if(!passwordBool) {
      return res.status(400).json({
         msg: 'El Email o la contraseña no son validos - password'
      })
   };

   // Generar un JWT
   const token = await generadorJWT( {id: usuario._id, nombre: usuario.nombre} )


   // Enviar respuesta al cliente
   res.json({
      msg: 'Usuario logiado',
      token: token
   })

};


module.exports = {
   login
}
