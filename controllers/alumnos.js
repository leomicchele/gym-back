const bcrypt = require('bcrypt');

const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const Gimnasio = require('../models/gimnasio');
const Rutina = require('../models/rutina');
const Historial = require('../models/historial');
const Pago = require('../models/pagos');

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

      // Eliminar el campo "Password" de la respuesta
      respuesta[1].forEach( alumno => {
         alumno.password = undefined
      })

      res.status(200).json({
         Total_Usuarios: respuesta[0],
         Usuarios: respuesta[1]
      })

   } catch (error) {
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
      console.log('La peticion no se realizo  en getAlumnos en alumnos.js: ', error)
   }  
}

// CREAR USUARIO
async function createAlumnos(req, res) {
   const body = req.body
   const fechaActualArgentina = Date.now() - (3 * 60 * 60 * 1000)

   try {      
      const alumnoNuevo = new Alumno(body);
      const rutinaNueva = new Rutina({
         caducacionRutina: '',
         fechaActualizacionProfesor: fechaActualArgentina,
         fechaActualizacionAlumno: fechaActualArgentina,
         fechaCreacion: fechaActualArgentina,
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

      console.log(`Alumno Creado: ${alumnoNuevo.nombre} ${alumnoNuevo.apellido}`)
   
      // Regresa una respuesta al cliente
      res.status(201).json({
        msg: "Alumno Registrado",     
        alumno_Resgistrado: {
          nombre: alumnoNuevo.nombre,
          apellido: alumnoNuevo.apellido
        }
      });
   } catch (error) {
      console.log('La peticion no se realizo en createAlumnos en alumnos.js: ', error)
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
   }

}

// ACTUALIZAR USUARIO
async function updateAlumnos(req, res) {
   const fechaActualArgentina = Date.now() - (3 * 60 * 60 * 1000)
   const id = req.params.id
   const {...resto} = req.body

   // Encriptar contraseñas
   if (resto.password) {
      const hash = bcrypt.hashSync(resto.password, 10);
      resto.password = hash;      
   }

   try {      
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

       // Si no existe el pagosId
       if (!alumno.pagosId) {
         const pagosNuevo = new Pago({
            pagos: []   
         });
         await pagosNuevo.save()
         resto.pagosId = pagosNuevo._id      
       } else { // Si existe el pagosId, actualiza los pagos
         await Pago.findOneAndUpdate({_id: alumno.pagosId }, {pagos: resto.pagos}, {new: true})
       }

      // Si no existe la rutinaId, Se crea (Temporal hasta que se cree el historial en la DB de alumnos viejos)
      if (!alumno.rutinaId) {
         const rutinaNueva = new Rutina({
            caducacionRutina: '',
            fechaActualizacionProfesor: fechaActualArgentina,
            fechaActualizacionAlumno: fechaActualArgentina,
            rutina: []   
         });
         await rutinaNueva.save()
         resto.rutinaId = rutinaNueva._id          
         await Rutina.findOneAndUpdate({_id: rutinaNueva._id }, {rutina: resto.rutina, caducacionRutina: resto.caducacionRutina}, {new: true})

      } else { // Si existe la rutinaId, actualiza la rutina

         const rutinaId = req.body.rutinaId

          // Verifica quien envio la peticion
         if (req.body.profesor || req.body.gimnasio) { // Si envia la peticion el profesor o el gimnasio

            await Rutina.findOneAndUpdate({ _id: rutinaId }, { rutina: resto.rutina, ...(resto.caducacionRutina && { caducacionRutina: resto.caducacionRutina }), fechaActualizacionProfesor: fechaActualArgentina }, { new: true })

         } else { // Si envia la peticion el alumno

            // verifica si la fecha de actualizacion del profesor existe en la DB
            const rutina = await Rutina.findOne({ _id: rutinaId })       
            if (rutina.fechaActualizacionProfesor) {
               // Verifica si la fecha de actualizacion del profesor es mayor a la fecha de descarga de la rutina
               if (rutina.fechaActualizacionProfesor > rutina?.fechaDescargaRutina) {
                  return res.status(400).json({
                     msg: 'Actualiza la rutina, tienes una versión antigua'
                  })              
               } 
            }
            await Rutina.findOneAndUpdate({ _id: rutinaId }, { rutina: resto.rutina, ...(resto.caducacionRutina && { caducacionRutina: resto.caducacionRutina }), fechaActualizacionAlumno: fechaActualArgentina }, { new: true })
         }
   
       }

      // Actualiza 
      const alumnoUpdate = await Alumno.findOneAndUpdate({_id: id}, {...resto, rutina: []}, {new: true})

      console.log(`Alumno Actualizado: ${alumnoUpdate.nombre} ${alumnoUpdate.apellido} por ${(req.body.profesor || req.body.gimnasio) ? 'PROFESOR' : 'ALUMNO'}`)
   
      res.status(201).json({
         msg: 'Alumno actualizado',
         alumnoUpdate: {
            nombre: alumnoUpdate.nombre,
            apellido: alumnoUpdate.apellido
         }
      })
   } catch (error) {
      console.log('La peticion no se realizo en updateAlumnos en alumnos.js: ', error)
      res.status(500).json({
         msg: 'La peticion no se realizo, error en el servidor',
      })
   }

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

//OBTENER ALUMNO
async function getAlumno(req, res) {

   const id = req.params.id; // es el id del alumno
   let nombreProfesor;
   

   try {

      let alumno = await Alumno.findOne({ _id: id })

      if (!alumno) {
         return res.status(400).json({
            msg: 'No existe Alumno'
         })         
      }

      if (alumno.profesor) {
         const profesor = await Profesor.findOne({ _id: alumno.profesor })
         if (!profesor) {
            nombreProfesor = 'No tiene profesor'         
         } else {
            nombreProfesor = profesor.nombre + ' ' + profesor.apellido              
         }         
      }

      if (alumno.gimnasio && !alumno.profesor) {
         const gimnasio = await Gimnasio.findOne({ _id: alumno.gimnasio })
         if (!gimnasio) {
            nombreProfesor = 'No tiene gimnasio'         
         } else {
            nombreProfesor = gimnasio.nombre
         }
      }
      
      res.status(200).json({
         Alumno: {
            estado: alumno.estado,
            altura: alumno.altura,
            peso: alumno.peso,
            grasaCorporal: alumno.grasaCorporal,
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            dni: alumno.dni,
            experiencia: alumno.experiencia,
            lesion: alumno.lesion,
            patologia: alumno.patologia,
            objetivo: alumno.objetivo,
            diasSemanales: alumno.diasSemanales,
            deporte: alumno.deporte,
            edad: alumno.edad,
            profesor: alumno.profesor,
            gimnasio: alumno.gimnasio,            
            nombreProfesor: nombreProfesor,
            _id: alumno._id,
         }
      }
      )

   } catch (error) {
      console.log('La peticion no se realizo en getAlumno: ', error)
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
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
   deleteAlumnos,
   getAlumno
}

