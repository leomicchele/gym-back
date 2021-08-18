const usuariosDB = require('../db/usuarios')

function getUsuarios(req, res) {
   
   res.status(200).json(usuariosDB)

}

function postUsuario(req, res) {
   const {nombre, edad, email} = req.body

   const usuario = {
      id: new Date,
      nombre,
      edad,
      email
   }

   usuariosDB.push(usuario);
   res.status(201).json({
      message: 'Usuario Creado',
      nombre,
      edad,
      email
   })

}

function patchUsuario(req, res) {

}

function deleteUsuario(req, res) {

}

module.exports = {
   getUsuarios,
   postUsuario,
   patchUsuario,
   deleteUsuario
}

