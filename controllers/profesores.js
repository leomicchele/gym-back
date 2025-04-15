const bcrypt = require('bcrypt');

const Profesor = require('../models/profesor');
const Alumno = require('../models/alumno');
const Gimnasio = require('../models/gimnasio');
const Log = require('../models/log');

// OBTENER PROFESORES DE UN GIMNASIO
async function getProfesores(req, res) {

   const { limite, desde, gimnasio } = req.query;

   try {
      const respuesta = await Promise.all([
         Profesor.countDocuments({estado: true, gimnasio}), // Cuenta a los que estan dados de alta
         // Profesor.find({estado: true}).skip(Number(desde)).limit(Number(limite)) // Trae a los que estan dado de alta
         Profesor.find({gimnasio: gimnasio}) // Trae a los que estan dado de alta
      ]);

      // Guardar el log
      await Log.create({
         message: `Se llamo a getProfesores`,
         action: 'Get Profesores',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: {  }
      });

      res.status(200).json({
         Total_Usuarios: respuesta[0],
         Usuarios: respuesta[1]
      })

   } catch (error) {
      console.log('La peticion no se realizo')
      await Log.create({
         message: `Error al obtener los profesores`,
         action: 'Get Profesores',
         level: 'error',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: { error: error }
      });
   }  
}

// CREAR PROFESOR
async function createProfesores(req, res) {
   const body = req.body

   try {
      const profesorNuevo = new Profesor(body);
   
      // Encriptar contraseñas
      const hash = bcrypt.hashSync(body.password, 10);
      profesorNuevo.password = hash;
   
      // Guardar el usuario nuevo en base de datos
      await profesorNuevo.save()
   
      console.log(`Profesor Registrado: ${profesorNuevo.nombre} ${profesorNuevo.apellido}`)
      await Log.create({
         message: `Profesor Registrado: ${profesorNuevo.nombre} ${profesorNuevo.apellido}`,
         action: 'Create Profesor',
         level: 'info',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: {  }
      });
   
      // Regresa una respuesta al cliente
      res.status(201).json({
        msg: "Profesor Registrado",     
        profesor_Resgistrado: {
          nombre: profesorNuevo.nombre,
          apellido: profesorNuevo.apellido
        }
      });      
   } catch (error) {
      console.log('La peticion no se realizo en createProfesores en profesores.js: ', error)
      await Log.create({
         message: `Error al registrar el profesor`,
         action: 'Create Profesor',
         level: 'error',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: { error: error }
      });
      res.status(500).json({
         msg: 'La peticion no se realizo'
      })
   }

}

// ACTUALIZAR PROFESOR
async function updateProfesores(req, res) {

   const id = req.params.id
   const {...resto} = req.body

   // Encriptar contraseñas
   if (resto.password) {
      const hash = bcrypt.hashSync(resto.password, 10);
      resto.password = hash;      
   }

   try {
      // Actualiza todo menos email, google y password
      const profesorUpdate = await Profesor.findOneAndUpdate({_id: id}, resto, {new: true})
   
      console.log(`Profesor Actualizado: ${profesorUpdate.nombre} ${profesorUpdate.apellido}`)
      await Log.create({
         message: `Profesor Actualizado: ${profesorUpdate.nombre} ${profesorUpdate.apellido}`,
         action: 'Update Profesor',
         level: 'info',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: {  }
      });
   
      res.status(201).json({
         msg: 'Profesor actualizado',
         alumnoUpdate: {
            nombre: profesorUpdate.nombre,
            apellido: profesorUpdate.apellido,
         }
      })      
   } catch (error) {
      console.log('La peticion no se realizo en updateProfesores en profesores.js: ', error)
      await Log.create({
         message: `Error al actualizar el profesor`,
         action: 'Update Profesor',
         level: 'error',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: { error: error }
      });
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })      
   }
}

// ELIMINAR PROFESOR
async function deleteProfesores(req, res) {

   const id = req.params.id

   try {
      const respuesta = await Promise.all([       // Cuenta a los que estan dados de alta
         Alumno.find({ profesor: id }),
         Profesor.findById(id)
      ]);

      // cabiar el id del profesor de los alumnos al del gimnasio
      if (respuesta[0].length > 0) {
         await Alumno.updateMany({ profesor: id }, { profesor: respuesta[1].gimnasio })
      }

      const profesorBaja = await Profesor.findByIdAndRemove(id)

      console.log(`Profesor Eliminado: ${profesorBaja.nombre} ${profesorBaja.apellido}`)
      await Log.create({
         message: `Profesor Eliminado: ${profesorBaja.nombre} ${profesorBaja.apellido}`,
         action: 'Delete Profesor',
         level: 'info',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: {  }
      });

      res.status(201).json({
         msg: 'Profesor Eliminado',
         Profesor: profesorBaja,
      })
   } catch (error) {
      console.log('La peticion no se realizo en deleteProfesores en profesores.js:')
      await Log.create({
         message: `Error al eliminar el profesor`,
         action: 'Delete Profesor',
         level: 'error',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: { error: error }
      });
      res.status(500).json({
         msg: 'La peticion no se realizo'
      })
   }


}

// OBTENER TODOS LOS PROFESORES
async function getAllProfesores(req, res) {
   try {
      let profesores = await Profesor.find()
      let gimnasioName; 
      profesores = await Promise.all(profesores.map(async profesor => {
         gimnasioName = await Gimnasio.findById(profesor.gimnasio)
         return {
            nombre: profesor.nombre,
            apellido: profesor.apellido,
            email: profesor.email,
            limiteAlumnos: profesor.limiteAlumnos,
            gimnasio: profesor.gimnasio,
            fechaCreacion: profesor.fechaCreacion,
            _id: profesor._id,
            estado: profesor.estado,
            dni: profesor.dni,
            gimnasioName: gimnasioName.nombre,
         }
      }))

      // Guardar el log
      await Log.create({
         message: `Se llamo a getAllProfesores`,
         action: 'Get All Profesores',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: {  }
      });

      res.status(200).json({
         profesores
      })
   } catch (error) {
      console.log('La petición no se realizó en getAllProfesores:', error)
      // Guardar el log
      Log.create({
         message: `No se pudo obtener los profesores`,
         action: 'Get All Profesores',
         level: 'error',
         // user: req.user._id || 'No se pudo obtener el usuario', // asumiendo que tenés auth
         metadata: { error: error }
      });
      res.status(500).json({
         msg: 'No se pudo obtener los profesores'
      })
   }
}

// OBTENER LOS ALUMNOS DE UN PROFESOR
async function getAlumnosProfesor(req, res) {
   try {
      const id = req.params.id
      let alumnos = await Alumno.find({ profesor: id })
      alumnos = await Promise.all(alumnos.map(async alumno => {
         alumno.gimnasio = await Gimnasio.findById(alumno.gimnasio)
         return {
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            estado: alumno.estado,
            dni: alumno.dni,
            fechaCreacion: alumno.fechaCreacion,
            _id: alumno._id,
            pagosId: alumno.pagosId,
            gimnasio: alumno.gimnasio.nombre,
            edad: alumno.edad,
         }
      }))
      res.status(200).json({
         alumnos
      })
   } catch (error) {
      console.log('La petición no se realizó en getAlumnosProfesor:', error)
      res.status(500).json({
         msg: 'No se pudo obtener los alumnos del profesor'
      })
   }
}

module.exports = {
   getProfesores,
   createProfesores,
   updateProfesores,
   deleteProfesores,
   getAllProfesores,
   getAlumnosProfesor
}

