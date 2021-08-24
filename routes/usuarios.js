const routes = require('express').Router();
const { check } = require('express-validator')

// Middleware personalizados
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarcampos } = require('../middlewares/validar-campos')

// Funciones helpers
const { verificarEmailRegitro, verificarExistenciaID } = require('../helpers/validaciones-custom')
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');


// OBTENER USUARIOS
routes.get('/', getUsuarios)

// CREAR USUARIO
routes.post('/', 
   check('nombre').notEmpty().withMessage('El nombre no debe venir vacio'),      
   check('email').isEmail().withMessage('Debe ser un mail valido'),
   check('password').isLength({ min: 6 }).withMessage('El password debe tener un minimo de 6 caracteres'),
   check('telefono').matches(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/).withMessage('Debe ser un telefono valido'),
   check('email').custom( (email) => verificarEmailRegitro(email) ), 
   validarcampos // MiddleWare personalizado
, createUsuario)

// ACTUALIZAR USUARIO
routes.put('/:id',
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaID(id) ),
   validarcampos // MiddleWare personalizado
, updateUsuario)


// DAR DE BAJA USUARIO
routes.delete('/:id',
   validarJWT, // MiddleWare personalizado
   validarRoles, // MiddleWare personalizado
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaID(id) ),
   validarcampos // MiddleWare personalizado (recibe los errores de los "chech()")
, deleteUsuario)


module.exports = routes