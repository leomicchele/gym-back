const routes = require('express').Router();
const { check } = require('express-validator');

const { mostrarHome } = require('../controllers/views');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

routes.post('/', validarJWT,  mostrarHome);

module.exports = routes 


