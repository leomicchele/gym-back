
const bcrypt = require('bcrypt');
const { generadorJWT } = require('../helpers/generador-jwt');
const verificacionGoogle = require('../helpers/verificacion-google');
const Usuario = require('../models/usuario')

// LOGIN TRADICIONAL
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


// LOGIN CON GOOGLE
async function loginGoogle(req, res) {
   const tokenGoogle = req.body.id_token

   try {
      // verifica si el token recibido es de Google, y trae los datos del payload
     const { email, nombre, apellido, img } = await verificacionGoogle(tokenGoogle);

      // Verifica si el email del payload existe en nuestra DB
      let usuario = await Usuario.findOne({ email: email }) 
      if(!usuario) { // Si no existe, lo crea
         usuario = new Usuario({email, nombre, apellido, img, password: 'generica', google: true })
         await usuario.save()
      }

      // Verifica si el usuario no esta dado de baja. 
      if(!usuario.estado) {
         res.status(401).json({
            msg: 'El usuario esta dado de baja'
         })
      }

      // Generar un JWT
      const token = await generadorJWT( {id: usuario._id, nombre: usuario.nombre} )

     res.status(201).json({
       msg: "Usuario logiado con GOOGLE",
       token: token,
     });

   } catch (error) { // Si algo del Try falla, lo recibimos aca.
      
     res.status(400).json({
      msg: "No es un token valido de Google",
    });
   }
}

module.exports = {
   login,
   loginGoogle
}
