const bcrypt = require('bcrypt');

const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const Gimnasio = require('../models/gimnasio');
const Rutina = require('../models/rutina');
const Historial = require('../models/historial');

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
   const rutinaNueva = new Rutina({
      caducacionRutina: '',
      rutina: []   
   });
   const historialNuevo = new Historial({
      historial: []   
   });

   await rutinaNueva.save()
   alumnoNuevo.rutinaId = rutinaNueva._id

   await historialNuevo.save()
   alumnoNuevo.historialId = historialNuevo._id


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

   // Encriptar contraseñas
   if (resto.password) {
      const hash = bcrypt.hashSync(resto.password, 10);
      resto.password = hash;      
   }

   // find alumno
   const alumno = await Alumno.findById(id)

   // Si no existe el historial, lo crea (Temporal hasta que se cree el historial en la DB de alumnos viejos)
   if (!alumno.historialId) {
      const historialNuevo = new Historial({
         historial: []   
      });
      await historialNuevo.save()
      resto.historialId = historialNuevo._id      
    }
   // Si no existe la rutinaId, Se crea (Temporal hasta que se cree el historial en la DB de alumnos viejos)
   if (!alumno.rutinaId) {
      const rutinaNueva = new Rutina({
         caducacionRutina: '',
         rutina: []   
      });
      await rutinaNueva.save()
      resto.rutinaId = rutinaNueva._id          
      await Rutina.findOneAndUpdate({_id: rutinaNueva._id }, {rutina: resto.rutina, caducacionRutina: resto.caducacionRutina}, {new: true})
    } else {
      const rutinaId = req.body.rutinaId
       // Actualiza Rutina
       await Rutina.findOneAndUpdate({_id: rutinaId}, {rutina: resto.rutina, ...(resto.caducacionRutina && { caducacionRutina: resto.caducacionRutina })}, {new: true})

    }


   
   // Actualiza 
   const alumnoUpdate = await Alumno.findOneAndUpdate({_id: id}, {...resto, rutina: []}, {new: true})

   res.status(201).json({
      msg: 'Alumno actualizado',
      alumnoUpdate: {
         nombre: alumnoUpdate.nombre,
         apellido: alumnoUpdate.apellido,
         // rutina: rutinaUpdate.rutina,
         // caducacionRutina: rutinaUpdate.caducacionRutina
      }
   })
}

// ELIMINAR USUARIO
async function deleteAlumnos(req, res) {

   const alumnoId = req.params.id
   try {
      // Buscar el alumno por su ID
      const alumno = await Alumno.findById(alumnoId);
  
      if (!alumno) {
        return res.status(404).json({ msg: 'Alumno no encontrado' });
      }
  
      // Eliminar rutina asociada, si existe
      if (alumno.rutinaId) {
        await Rutina.findByIdAndRemove(alumno.rutinaId);
      }
  
      // Eliminar historial asociado, si existe
      if (alumno.historialId) {
        await Historial.findByIdAndRemove(alumno.historialId);
      }
  
      // Eliminar el alumno (usuario)
      await Alumno.findByIdAndRemove(alumnoId);
  
      res.status(201).json({
        msg: 'Usuario Eliminado',
        // Usuario: usuarioBaja,
      });
    } catch (error) {
      console.error('Error al eliminar usuario y referencias:', error);
      res.status(500).json({ msg: 'Error interno del servidor' });
    }
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

