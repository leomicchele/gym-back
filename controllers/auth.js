
const bcrypt = require('bcrypt');
const { generadorJWT } = require('../helpers/generador-jwt');
const verificacionGoogle = require('../helpers/verificacion-google');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const Gimnasio = require('../models/gimnasio');

// LOGIN TRADICIONAL
async function login(req, res) {

   
   const { dni, password } = req.body
   const email = req.body.email || null
   let respuesta;

   if (email) {
       respuesta = await Promise.all([
         Profesor.findOne({ email: email }), // Cuenta a los que estan dados de alta
         Gimnasio.findOne({ email: email }), // Cuenta a los que estan dados de alta
         
      ]);

      const [profesor, gimnasio] = respuesta;
      if (profesor === null && gimnasio === null) { // Ambos resultados son null, envía un error 401, no existen
         return res.status(400).json({ msg: 'Verifica Usuario y contraseña' });
      }
      if (profesor !== null && profesor.estado === false) { // cuando el profesor esta inactivo
         return res.status(401).json({ msg: 'No autorizado' });
      }
      if (gimnasio !== null && gimnasio.estado === false) { // cuando el gimnasio esta inactivo
         return res.status(401).json({ msg: 'No autorizado' });
      }

      
      
   } else {
      respuesta = await Promise.all([
         Alumno.findOne({ dni: dni }), // Cuenta a los que estan dados de alta
         
      ]);

      const [alumno] = respuesta;
      if (alumno === null ) {
         return res.status(400).json({ msg: 'Verifica Usuario y contraseña' });
     }
      if (alumno.estado === false) { // cuando el alumno esta inactivo
         return res.status(401).json({ msg: 'No autorizado' });         
      }
   }

   let usuario;

   respuesta.forEach(colection => {
      if (colection === null) return
      usuario = colection
   });

   try {
      // const alumno = await Alumno.findOne({ dni: dni }) 
      
      // Compara el password
      const passwordBool = bcrypt.compareSync(password, usuario.password);  
      if(!passwordBool) {
         return res.status(400).json({
            msg: 'Verifica Usuario y contraseña'
         })
      };
   
      // Generar un JWT
      const token = await generadorJWT( {id: usuario._id, nombre: usuario.nombre} )
   
     if (usuario.rol === 'PROFESOR_ROL' || usuario.rol === 'GYM_ROL') {
        // Enviar respuesta al cliente
        res.json({
           msg: 'Usuario logiado',
           token: token,
           id: usuario._id,
           rol: usuario.rol,
           nombre: usuario.nombre
        })
      } else {
        res.json({
           msg: 'Usuario logiado',
           token: token,
           id: usuario._id,
           rol: usuario.rol,
           nombre: usuario.nombre,
           rutina: usuario.rutina
        })
      
     }
   } catch (error) {
      console.info("Error login", error)
      return res.status(400).json({
         msg: 'Problema con el Login'
      })
   }
   
};


// LOGIN CON GOOGLE
// async function loginGoogle(req, res) {
//    const tokenGoogle = req.body.id_token

//    try {
//       // verifica si el token recibido es de Google, y trae los datos del payload
//      const { email, nombre, apellido, img } = await verificacionGoogle(tokenGoogle);

//       // Verifica si el email del payload existe en nuestra DB
//       let usuario = await Alumno.findOne({ email: email }) 
//       if(!usuario) { // Si no existe, lo crea
//          usuario = new Alumno({email, nombre, apellido, img, password: 'generica', google: true })
//          await usuario.save()
//       }

//       // Verifica si el usuario no esta dado de baja. 
//       if(!usuario.estado) {
//          res.status(401).json({
//             msg: 'El usuario esta dado de baja'
//          })
//       }

//       // Generar un JWT
//       const token = await generadorJWT( {id: usuario._id, nombre: usuario.nombre} )

//      res.status(201).json({
//        msg: "Usuario logiado con GOOGLE",
//        token: token,
//        id: usuario._id
//      });

//    } catch (error) { // Si algo del Try falla, lo recibimos aca.
      
//      res.status(400).json({
//       msg: "No es un token valido de Google",
//     });
//    }
// }

module.exports = {
   login,
   // loginGoogle
}
