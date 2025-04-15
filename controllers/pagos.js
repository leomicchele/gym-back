
const Alumno = require('../models/alumno');
const logEvent = require('../utils/logger');
const Pago = require('../models/pagos');


// OBTENER Pagos
async function getPagos(req, res) {

   const id = req.params.id; // es el id del alumno

   try {

      const alumno = await Alumno.findOne({ _id: id })
      if (!alumno) {
         logEvent({
            message: `No existe Alumno`,
            action: 'Get Pagos',
            level: 'error',
            // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
            metadata: { }
         });
         return res.status(400).json({
            msg: 'No existe Alumno'
         })         
      }

      

      if (!alumno.pagosId) {
         const pagosNuevo = new Pago({
            pagos: []   
         });
         await pagosNuevo.save()
         alumno.pagosId = pagosNuevo._id      
         //guardar alumno
         await Alumno.findOneAndUpdate({ _id: id }, { pagosId: pagosNuevo._id }, { new: true }) 
      }

      let respuestapagos = await Pago.findOne({ _id: alumno.pagosId })

      logEvent({
         message: `Se llamo a getPagos`,
         action: 'Get Pagos',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: {  }
      });   

      res.status(200).json({
         pagos: respuestapagos.pagos
      })

   } catch (error) {
      console.log('La peticion no se realizo en getPagos: ', error)
      logEvent({
         message: `Error al obtener los pagos`,
         action: 'Get Pagos',
         level: 'error',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: { error: error }
      });
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
   }  
}



// ACTUALIZAR Pagos
async function updatePagos(req, res) {

   const id = req.params.id // es el id del alumno
   const { pagos } = req.body

   try {
      // find alumno
      const alumno = await Alumno.findOne({ _id: id })
      if (!alumno) {
         logEvent({
            message: `No existe Alumno`,
            action: 'Update Pagos',
            level: 'error',
            // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
            metadata: { }
         });
         return res.status(400).json({
            msg: 'No existe Alumno'
         })
      }

      // si no tiene pagosId, crea un nuevo historial y lo guarda en el alumno
      if (!alumno.pagoslId) {
         const pagosNuevo = new Pago({
            pagos: []   
         });
         await pagosNuevo.save()
         alumno.pagosId = pagosNuevo._id      
         //guardar alumno
         await Alumno.findOneAndUpdate({ _id: id }, { pagosId: pagosNuevo._id }, { new: true })         
      }

      // find historial (historialActual.historial es un array de objetos)
      const  pagosActual = await Pago.findOne({ _id: alumno.pagosId }) 


      // pushea al array el nuevo historial, si el historialActual.historial tiene mas de 30 elementos, elimina el primero.
      pagosActual.pagos.push(pagos)
      if (pagosActual.pagos.length > 30) {
         historialActual.historial.shift()
      }

      // actualiza historial
      await Pago.findOneAndUpdate({ _id: alumno.pagosId }, { pagos: pagosActual.pagos }, { new: true })

      logEvent({
         message: `Pagos actualizados`,
         action: 'Update Pagos',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: {  }
      });

      res.status(201).json({
         msg: 'Pagos actualizado'
      })

   } catch (error) {
      console.log('La peticion no se realizo en updatePagos: ', error)
      logEvent({
         message: `Error al actualizar los pagos`,
         action: 'Update Pagos',
         level: 'error',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: { error: error }
      });
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
   }

}

module.exports = {
   getPagos,
   // createGimnasio,
   updatePagos,
   // deleteGimnasio,
}

