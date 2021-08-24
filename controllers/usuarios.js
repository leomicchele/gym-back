const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario')


// OBTENER USUARIOS
async function getUsuarios(req, res) {

   const { limite, desde } = req.query;

   try {
      const respuesta = await Promise.all([
         Usuario.countDocuments({estado: true}), // Cuenta a los que estan dados de alta
         Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limite)) // Trae a los que estan dado de alta
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
async function createUsuario(req, res) {
   const body = req.body

   const usuarioNuevo = new Usuario(body);

   // Encriptar contraseñas
   const hash = bcrypt.hashSync(body.password, 10);
   usuarioNuevo.password = hash;

   // Guardar el usuario nuevo en base de datos
   usuarioNuevo.save()

   // Regresa una respuesta al cliente
   res.status(201).json({
     message: "Usuario Creado",     
     usuario_Resgistrado: {
       nombre: usuarioNuevo.nombre,
       email: usuarioNuevo.email,
       telefono: usuarioNuevo.telefono,
     }
   });
}

// ACTUALIZAR USUARIO
async function updateUsuario(req, res) {

   const id = req.params.id
   const {email, google, password, ...resto} = req.body

   // Actualiza todo menos email, google y password
   const usuarioUpdate = await Usuario.findOneAndUpdate({_id: id}, resto)

   res.status(201).json({
      msg: 'Usuario actualizado',
      usuarioUpdate
   })
}

// ELIMINAR USUARIO
async function deleteUsuario(req, res) {

   const id = req.params.id

   const usuarioBaja = await Usuario.findByIdAndUpdate(id, {estado: false})
   
   res.status(201).json({
      msg: 'Usuario dado de baja',
      Usuario: usuarioBaja,
   })
}

module.exports = {
   getUsuarios,
   createUsuario,
   updateUsuario,
   deleteUsuario,
}

