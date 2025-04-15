const routes = require('express').Router();
const { check } = require('express-validator')

// Middleware personalizados
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarcampos } = require('../middlewares/validar-campos')

// Funciones helpers
const { verificarEmailRegitro, verificarExistenciaID, verificarExistenciaIDProfesor, verificarExistenciaIDAlumno } = require('../helpers/validaciones-custom')
const { getLogs } = require('../controllers/logs');


// OBTENER PAGOS 
routes.get('/', getLogs)


module.exports = routes