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

   const profesorNuevo = new Profesor(body);

   // Encriptar contraseñas
   const hash = bcrypt.hashSync(body.password, 10);
   profesorNuevo.password = hash;

   // Guardar el usuario nuevo en base de datos
   await profesorNuevo.save()

   // Regresa una respuesta al cliente
   res.status(201).json({
     msg: "Profesor Registrado",     
     profesor_Resgistrado: {
       nombre: profesorNuevo.nombre,
       apellido: profesorNuevo.apellido
     }
   });
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

   // Actualiza todo menos email, google y password
   const profesorUpdate = await Profesor.findOneAndUpdate({_id: id}, resto, {new: true})

   res.status(201).json({
      msg: 'Profesor actualizado',
      alumnoUpdate: {
         nombre: profesorUpdate.nombre,
         apellido: profesorUpdate.apellido,
      }
   })
}

// ELIMINAR USUARIO
async function deleteProfesores(req, res) {

   const id = req.params.id

   const respuesta = await Promise.all([       // Cuenta a los que estan dados de alta
      Alumno.find({profesor: id}),
      Profesor.findById(id)
   ]);   

   // cabiar el id del profesor de los alumnos al del gimnasio
   if (respuesta[0].length > 0) {
      await Alumno.updateMany({profesor: id}, {profesor: respuesta[1].gimnasio})
   }

   const profesorBaja = await Profesor.findByIdAndRemove(id)
   
   res.status(201).json({
      msg: 'Profesor Eliminado',
      Profesor: profesorBaja,
   })
}

module.exports = {
   getProfesores,
   createProfesores,
   updateProfesores,
   deleteProfesores,
}

