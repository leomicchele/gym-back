const routes = require('express').Router();
const { getUsuarios, postUsuario, patchUsuario, deleteUsuario } = require('../controllers/usuarios')

routes.get('/', getUsuarios)

routes.post('/', postUsuario)

routes.patch('/', patchUsuario)

routes.delete('/', deleteUsuario)


module.exports = routes