
const Rutina = require('../models/rutina')


// OBTENER Rutinas
async function getRutina(req, res) {

   const { id } = req.params;
   const tipoUsuario = req.query?.tipoUsuario
   const fechaActual = Date.now() - (3 * 60 * 60 * 1000)

   try {

      const respuesta = await Rutina.findOne({ _id: id })
      if (!respuesta) {
         return res.status(400).json({
            msg: 'No existe rutina'
         })         
      }

      // Guardar la fecha de descarga en la rutina
      if (tipoUsuario === 'ALUMNO_ROL') {
         respuesta.fechaDescargaRutina = fechaActual
         await respuesta.save()
      }      

      res.status(200).json({
         rutina: respuesta.rutina,
         caducacionRutina: respuesta.caducacionRutina,
         fechaActualizacionProfesor: respuesta?.fechaActualizacionProfesor,
         fechaActualizacionAlumno: respuesta?.fechaActualizacionAlumno,
         fechaDescargaRutina: fechaActual
      })

   } catch (error) {
      console.log('La peticion no se realizo en getRutina en rutinas.js: ', error)
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

// // ACTUALIZAR USUARIO
// async function updateGimnasio(req, res) {

//    const id = req.params.id
//    const {...resto} = req.body

//    // Actualiza todo menos email, google y password
//    const gimnasioUpdate = await Gimnasio.findOneAndUpdate({_id: id}, resto, {new: true})

//    res.status(201).json({
//       msg: 'Profesor actualizado',
//       alumnoUpdate: {
//          nombre: gimnasioUpdate.nombre,
//          apellido: gimnasioUpdate.apellido,
//       }
//    })
// }

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
   getRutina,
   // createGimnasio,
   // updateGimnasio,
   // deleteGimnasio,
}

