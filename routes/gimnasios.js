const routes = require('express').Router();
const { check } = require('express-validator')

// Middleware personalizados
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarcampos } = require('../middlewares/validar-campos')

// Funciones helpers
const { verificarEmailRegitro, verificarExistenciaID, verificarExistenciaIDProfesor } = require('../helpers/validaciones-custom')
const { getGimnasios, createGimnasio, updateGimnasio, deleteGimnasio } = require('../controllers/gimnasios');


// OBTENER GIMNASIOS
routes.get('/', getGimnasios)

// CREAR GIMNASIO
routes.post('/', 
   check('nombre').notEmpty().withMessage('El nombre no debe venir vacio'),      
   // check('apellido').notEmpty().withMessage('El nombre no debe venir vacio'),      
   // check('email').isEmail().withMessage('Debe ser un mail valido'),
   check('password').isLength({ min: 6 }).withMessage('El password debe tener un minimo de 6 caracteres'),
   // check('telefono').matches(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/).withMessage('Debe ser un telefono valido'),
   // check('email').custom( (email) => verificarEmailRegitro(email) ), 
   validarcampos // MiddleWare personalizado, recibe el error de los check()
, createGimnasio)

// ACTUALIZAR GIMNASIO
routes.put('/:id',
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaIDProfesor(id) ),
   validarcampos // MiddleWare personalizado, recibe el error de los check()
, updateGimnasio)


// DAR DE BAJA GIMNASIO
routes.delete('/:id',
   validarJWT, // MiddleWare personalizado
   validarRoles, // MiddleWare personalizado
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaIDProfesor(id) ),
   validarcampos // MiddleWare personalizado (recibe los errores de los "chech()")
, deleteGimnasio)


// OBTENER GIMNASIOS
// routes.get('/', getGimnasios)


module.exports = routes