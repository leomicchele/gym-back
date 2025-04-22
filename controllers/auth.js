const bcrypt = require('bcrypt');
const { generadorJWT } = require('../helpers/generador-jwt');
const verificacionGoogle = require('../helpers/verificacion-google');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const Gimnasio = require('../models/gimnasio');
const logEvent = require('../utils/logger');


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
         Alumno.findOne({ dni: dni, estado: true }), // Busca solo alumnos activos
         
      ]);

      const [alumno] = respuesta;
      if (alumno === null ) {
         return res.status(400).json({ msg: 'Verifica Usuario y contraseña' });
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
   
     if (usuario.rol === 'PROFESOR_ROL') {
         console.log('PROFESOR LOGUEADO', usuario.nombre)
         logEvent({
            message: `Profesor logueado: ${usuario.nombre}`,
            action: 'Login Profesor',
            // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
            metadata: {  }
         });
        // Enviar respuesta al cliente
        res.json({
           msg: 'Usuario logiado',
           token: token,
           id: usuario._id,
           rol: usuario.rol,
           nombre: usuario.nombre,
           gimnasio: usuario.gimnasio
        })
      } else if(usuario.rol === 'ALUMNO_ROL') {
         console.log('ALUMNO LOGUEADO', usuario.nombre)
         logEvent({
            message: `Alumno logueado: ${usuario.nombre}`,
            action: 'Login Alumno',
            // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
            metadata: {  }
         });

        res.json({
           msg: 'Usuario logiado',
           token: token,
           id: usuario._id,
           rol: usuario.rol,
           nombre: usuario.nombre,
           rutina: usuario.rutina,
           rutinaId: usuario?.rutinaId,
         //   caducacionRutina: usuario?.caducacionRutina
        })
     } else if(usuario.rol === 'GYM_ROL') {
         console.log('GYM LOGUEADO', usuario.nombre)
         logEvent({
            message: `Gimnasio logueado: ${usuario.nombre}`,
            action: 'Login Gimnasio',
            // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
            metadata: {  }
         });
         res.json({
            msg: 'Usuario logiado',
            token: token,
            id: usuario._id,
            rol: usuario.rol,
            nombre: usuario.nombre
         })
     }
   } catch (error) {
      console.info("Error login", error)
      logEvent({
         message: `Error al iniciar sesion`,
         action: 'Login',
         level: 'error',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: { error: error }
      });
      return res.status(400).json({
         msg: 'Problema con el Login'
      })
   }
   
};


module.exports = {
   login,
   // loginGoogle
}
