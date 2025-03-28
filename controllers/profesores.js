const bcrypt = require('bcrypt');

const Profesor = require('../models/profesor');
const Alumno = require('../models/alumno');


// OBTENER USUARIOS
async function getProfesores(req, res) {

   const { limite, desde, gimnasio } = req.query;

   try {
      const respuesta = await Promise.all([
         Profesor.countDocuments({estado: true, gimnasio}), // Cuenta a los que estan dados de alta
         // Profesor.find({estado: true}).skip(Number(desde)).limit(Number(limite)) // Trae a los que estan dado de alta
         Profesor.find({gimnasio: gimnasio}) // Trae a los que estan dado de alta
      ]);

      res.status(200).json({
         Total_Usuarios: respuesta[0],
         Usuarios: respuesta[1]
      })

   } catch (error) {
      console.log('La peticion no se realizo')
   }  
}

// CREAR USUARIO
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
      res.status(500).json({
         msg: 'La peticion no se realizo'
      })
   }

}

// ACTUALIZAR USUARIO
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
   
      res.status(201).json({
         msg: 'Profesor actualizado',
         alumnoUpdate: {
            nombre: profesorUpdate.nombre,
            apellido: profesorUpdate.apellido,
         }
      })      
   } catch (error) {
      console.log('La peticion no se realizo en updateProfesores en profesores.js: ', error)
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })      
   }
}

// ELIMINAR USUARIO
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

      res.status(201).json({
         msg: 'Profesor Eliminado',
         Profesor: profesorBaja,
      })
   } catch (error) {
      console.log('La peticion no se realizo en deleteProfesores en profesores.js:')
      res.status(500).json({
         msg: 'La peticion no se realizo'
      })
   }


}

module.exports = {
   getProfesores,
   createProfesores,
   updateProfesores,
   deleteProfesores,
}

