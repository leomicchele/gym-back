
const Alumno = require('../models/alumno');
const Historial = require('../models/historial');
const logEvent = require('../utils/logger');


// OBTENER Historial
async function getHistorial(req, res) {

   const id = req.params.id; // es el id del alumno

   try {

      const alumno = await Alumno.findOne({ _id: id })
      if (!alumno) {
         logEvent({
            message: `No existe Alumno`,
            action: 'Get Historial',
            level: 'error',
            // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
            metadata: { }
         });
         return res.status(400).json({
            msg: 'No existe Alumno'
         })         
      }

      

      if (!alumno.historialId) {
         const historialNuevo = new Historial({
            historial: []   
         });
         await historialNuevo.save()
         alumno.historialId = historialNuevo._id      
         //guardar alumno
         await Alumno.findOneAndUpdate({ _id: id }, { historialId: historialNuevo._id }, { new: true }) 
      }

      let respuestaHistorial = await Historial.findOne({ _id: alumno.historialId })

      logEvent({
         message: `Se llamo a getHistorial`,
         action: 'Get Historial',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: {  }
      });

      res.status(200).json({
         historial: respuestaHistorial.historial
      })

   } catch (error) {
      console.log('La peticion no se realizo en getHistorial: ', error)
      logEvent({
         message: `Error al obtener el historial`,
         action: 'Get Historial',
         level: 'error',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: { error: error }
      });
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
   }  
}

// CREAR USUARIO
// async function createGimnasio(req, res) {
//    const body = req.body

//    const gimnasioNuevo = new Gimnasio(body);

//    // Encriptar contraseñas
//    const hash = bcrypt.hashSync(body.password, 10);
//    gimnasioNuevo.password = hash;
//    gimnasioNuevo.fechaCreacion = Date.now()

//    // Guardar el usuario nuevo en base de datos
//    await gimnasioNuevo.save()

//    // Regresa una respuesta al cliente
//    res.status(201).json({
//      msg: "Gimnasio Registrado",     
//      profesor_Resgistrado: {
//        nombre: gimnasioNuevo.nombre,
//        apellido: gimnasioNuevo.apellido
//      }
//    });
// }

// ACTUALIZAR Historial
async function updateHistorial(req, res) {

   const id = req.params.id // es el id del alumno
   const { historial } = req.body

   try {
      // find alumno
      const alumno = await Alumno.findOne({ _id: id })
      if (!alumno) {
         logEvent({
            message: `No existe Alumno`,
            action: 'Update Historial',
            level: 'error',
            // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
            metadata: { }
         });
         return res.status(400).json({
            msg: 'No existe Alumno'
         })
      }

      // si no tiene historialId, crea un nuevo historial y lo guarda en el alumno
      if (!alumno.historialId) {
         const historialNuevo = new Historial({
            historial: []   
         });
         await historialNuevo.save()
         alumno.historialId = historialNuevo._id      
         //guardar alumno
         await Alumno.findOneAndUpdate({ _id: id }, { historialId: historialNuevo._id }, { new: true })         
      }

      // find historial (historialActual.historial es un array de objetos)
      const  historialActual = await Historial.findOne({ _id: alumno.historialId }) 


      // pushea al array el nuevo historial, si el historialActual.historial tiene mas de 30 elementos, elimina el primero.
      historialActual.historial.push(historial)
      if (historialActual.historial.length > 30) {
         historialActual.historial.shift()
      }

      // actualiza historial
      await Historial.findOneAndUpdate({ _id: alumno.historialId }, { historial: historialActual.historial }, { new: true })

      logEvent({
         message: `Historial actualizado`,
         action: 'Update Historial',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: {  }
      });
      res.status(201).json({
         msg: 'Historial actualizado'
      })

   } catch (error) {
      console.log('La peticion no se realizo en updateHistorial: ', error)
      logEvent({
         message: `Error al actualizar el historial`,
         action: 'Update Historial',
         level: 'error',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: { error: error }
      });
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
   }

}

// // ELIMINAR USUARIO
// async function deleteGimnasio(req, res) {

//    const id = req.params.id

//    const profesorBaja = await Gimnasio.findByIdAndUpdate(id, {estado: false})
   
//    res.status(201).json({
//       msg: 'Profesor dado de baja',
//       Profesor: profesorBaja,
//    })
// }

module.exports = {
   getHistorial,
   // createGimnasio,
   updateHistorial,
   // deleteGimnasio,
}

