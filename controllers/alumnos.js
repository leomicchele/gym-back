const bcrypt = require('bcrypt');

const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const Gimnasio = require('../models/gimnasio');


// OBTENER USUARIOS
// async function getUsuario(req, res) {

//    const { id  } = req.query;

//    try {
//       const respuesta = await Promise.all([
//          Alumno.findOne({estado: true, _id: id}), 
//          Profesor.findOne({estado: true, _id: id}), 
//          Gimnasio.findOne({estado: true, _id: id}) 
//       ]);

//       console.info(respuesta)

//       res.status(200).json({
//          Usuarios: respuesta[1]
//       })

//    } catch (error) {
//       console.log('La peticion no se realizo')
//    }  
// }
async function getAlumnos(req, res) {

   const { limite, desde } = req.query;
   const usuarioId = req.query.profesor ? req.query.profesor : req.query.gimnasio

   try {

      let respuesta;


      if (!req.query.profesor) {  // GIMNASIO
         respuesta = await Promise.all([
            // Alumno.countDocuments({estado: true, profesor: profesor}), // Cuenta a los que estan dados de alta
            // Alumno.find({estado: true, profesor: profesor}).skip(Number(desde)).limit(Number(limite)) // Trae a los que estan dado de alta
            Alumno.countDocuments({gimnasio: usuarioId}), // Cuenta a los que estan dados de alta
            // Alumno.find({profesor: profesor}).skip(Number(desde)).limit(Number(limite)) // Trae a los que estan dado de alta
            Alumno.find({gimnasio: usuarioId}).populate('profesor', 'nombre apellido')
         ]);         
      } else {   // PROFESOR
         respuesta = await Promise.all([
            // Alumno.countDocuments({estado: true, profesor: profesor}), // Cuenta a los que estan dados de alta
            // Alumno.find({estado: true, profesor: profesor}).skip(Number(desde)).limit(Number(limite)) // Trae a los que estan dado de alta
            Alumno.countDocuments({profesor: usuarioId}), // Cuenta a los que estan dados de alta
            // Alumno.find({profesor: profesor}).skip(Number(desde)).limit(Number(limite)) // Trae a los que estan dado de alta
            Alumno.find({profesor: usuarioId}).populate('profesor', 'nombre apellido')
         ]); 
      }

      res.status(200).json({
         Total_Usuarios: respuesta[0],
         Usuarios: respuesta[1]
      })

   } catch (error) {
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
      console.log('La peticion no se realizo')
   }  
}

// CREAR USUARIO
async function createAlumnos(req, res) {
   const body = req.body

   const alumnoNuevo = new Alumno(body);

   // Encriptar contraseñas
   const hash = bcrypt.hashSync(body.password, 10);
   alumnoNuevo.password = hash;

   // Guardar el usuario nuevo en base de datos
   await alumnoNuevo.save()

   // Regresa una respuesta al cliente
   res.status(201).json({
     msg: "Alumno Registrado",     
     alumno_Resgistrado: {
       nombre: alumnoNuevo.nombre,
       apellido: alumnoNuevo.apellido
     }
   });
}

// ACTUALIZAR USUARIO
async function updateAlumnos(req, res) {

   const id = req.params.id
   const {...resto} = req.body
   console.info(resto)

   // Encriptar contraseñas
   if (resto.password) {
      const hash = bcrypt.hashSync(resto.password, 10);
      resto.password = hash;      
   }

   // Actualiza todo menos email, google y password
   const alumnoUpdate = await Alumno.findOneAndUpdate({_id: id}, resto, {new: true})

   res.status(201).json({
      msg: 'Alumno actualizado',
      alumnoUpdate: {
         nombre: alumnoUpdate.nombre,
         apellido: alumnoUpdate.apellido,
         email: alumnoUpdate.email,
         telefono: alumnoUpdate.telefono,
         google: alumnoUpdate.google,
      }
   })
}

// ELIMINAR USUARIO
async function deleteAlumnos(req, res) {

   const id = req.params.id

   const usuarioBaja = await Alumno.findByIdAndRemove(id)
   
   res.status(201).json({
      msg: 'Usuario Eliminado',
      Usuario: usuarioBaja,
   })
}
// async function deleteAlumnos(req, res) {

//    const id = req.params.id

//    const usuarioBaja = await Alumno.findByIdAndUpdate(id, {estado: false})
   
//    res.status(201).json({
//       msg: 'Usuario dado de baja',
//       Usuario: usuarioBaja,
//    })
// }

module.exports = {
   getAlumnos,
   createAlumnos,
   updateAlumnos,
   deleteAlumnos
}

