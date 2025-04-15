const routes = require('express').Router();
const { check } = require('express-validator')

// Middleware personalizados
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarcampos } = require('../middlewares/validar-campos')

// Funciones helpers
const { verificarEmailRegitroProfesor, verificarExistenciaID, verificarExistenciaIDProfesor } = require('../helpers/validaciones-custom')
const { getProfesores, createProfesores, updateProfesores, deleteProfesores, getAllProfesores, getAlumnosProfesor } = require('../controllers/profesores');
const { validarExistenciaProfesor } = require('../middlewares/validar-existencia-profesor');


// OBTENER PROFESORES
routes.get('/', getProfesores)

// CREAR PROFESOR
routes.post('/', 
   check('nombre').notEmpty().withMessage('El nombre no debe venir vacio'),      
   check('apellido').notEmpty().withMessage('El nombre no debe venir vacio'),      
   // check('email').isEmail().withMessage('Debe ser un mail valido'),
   check('password').isLength({ min: 6 }).withMessage('El password debe tener un minimo de 6 caracteres'),
   // check('telefono').matches(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/).withMessage('Debe ser un telefono valido'),
   check('email').custom( (email) => verificarEmailRegitroProfesor(email) ), 
   validarcampos, // MiddleWare personalizado, recibe el error de los check()
   validarExistenciaProfesor // MiddleWare personalizado
, createProfesores)

// ACTUALIZAR PROFESOR
routes.put('/:id',
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaIDProfesor(id) ),
   validarcampos // MiddleWare personalizado, recibe el error de los check()
, updateProfesores)


// DAR DE BAJA PROFESOR
routes.delete('/:id',
   validarJWT, // MiddleWare personalizado
   validarRoles, // MiddleWare personalizado
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaIDProfesor(id) ),
   validarcampos // MiddleWare personalizado (recibe los errores de los "chech()")
, deleteProfesores)

// OBTENER TODOS LOS PROFESORES
routes.get('/all-profesores', 
   validarJWT,
   validarRoles,
   getAllProfesores)

// OBTENER LOS ALUMNOS DE UN PROFESOR
routes.get('/all-profesores/:id',
   validarJWT,
   validarRoles,
   getAlumnosProfesor)


module.exports = routes