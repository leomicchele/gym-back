const bcrypt = require('bcrypt');

const Gimnasio = require('../models/gimnasio')


// OBTENER USUARIOS
async function getGimnasios(req, res) {

   const { limite, desde } = req.query;

   try {
      const respuesta = await Promise.all([
         Gimnasio.countDocuments(), // Cuenta a los que estan dados de alta
         Gimnasio.find().skip(Number(desde)).limit(Number(limite)) // Trae a los que estan dado de alta
      ]);

      res.status(200).json({
         Total_Gimnasios: respuesta[0],
         Usuarios: respuesta[1]
      })

   } catch (error) {
      console.log('La peticion no se realizo')
   }  
}

// CREAR USUARIO
async function createGimnasio(req, res) {
   const body = req.body

   const gimnasioNuevo = new Gimnasio(body);

   // Encriptar contraseñas
   const hash = bcrypt.hashSync(body.password, 10);
   gimnasioNuevo.password = hash;
   gimnasioNuevo.fechaCreacion = Date.now()

   try {
      // Guardar el usuario nuevo en base de datos
      await gimnasioNuevo.save()
      console.log(`Gimnasio Registrado: ${gimnasioNuevo.nombre} ${gimnasioNuevo.apellido}`)
   
      // Regresa una respuesta al cliente
      res.status(201).json({
        msg: "Gimnasio Registrado",     
        profesor_Resgistrado: {
          nombre: gimnasioNuevo.nombre,
          apellido: gimnasioNuevo.apellido
        }
      });      
   } catch (error) {
      console.log('La peticion no se realizo en createGimnasio en gimnasios.js: ', error)
      res.status(500).json({
         msg: 'La peticion no se realizo'
      })
   }
}

// ACTUALIZAR USUARIO
async function updateGimnasio(req, res) {

   const id = req.params.id
   const {...resto} = req.body

   try {
      // Actualiza todo menos email, google y password
      const gimnasioUpdate = await Gimnasio.findOneAndUpdate({_id: id}, resto, {new: true})
      console.log(`Gimnasio actualizado: ${gimnasioUpdate.nombre} ${gimnasioUpdate.apellido}`)
   
      res.status(201).json({
         msg: 'Gym  actualizado',
         alumnoUpdate: {
            nombre: gimnasioUpdate.nombre,
            apellido: gimnasioUpdate.apellido,
         }
      })
      
   } catch (error) {
      console.log('La peticion no se realizo en updateGimnasio en gimnasios.js: ', error)
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
   }

}

// ELIMINAR USUARIO
async function deleteGimnasio(req, res) {

   const id = req.params.id

   try {
      const profesorBaja = await Gimnasio.findByIdAndUpdate(id, {estado: false})
      
      res.status(201).json({
         msg: 'Profesor dado de baja',
         Profesor: profesorBaja,
      })      
   } catch (error) {
      console.log('La peticion no se realizo en deleteGimnasio en gimnasios.js: ', error)
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
   }
}

module.exports = {
   getGimnasios,
   createGimnasio,
   updateGimnasio,
   deleteGimnasio,
}

