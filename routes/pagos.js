const routes = require('express').Router();
const { check } = require('express-validator')

// Middleware personalizados
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarcampos } = require('../middlewares/validar-campos')

// Funciones helpers
const { verificarEmailRegitro, verificarExistenciaID, verificarExistenciaIDProfesor, verificarExistenciaIDAlumno } = require('../helpers/validaciones-custom')
const { getPagos, updatePagos } = require('../controllers/pagos');


// OBTENER PAGOS 
routes.get('/:id', getPagos)

// ACTUALIZAR PAGOS
routes.put('/:id',
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaIDAlumno(id) ),
   validarcampos // MiddleWare personalizado, recibe el error de los check()
, updatePagos)


module.exports = routes