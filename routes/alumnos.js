const routes = require('express').Router();
const { check } = require('express-validator')

// Middleware personalizados
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarcampos } = require('../middlewares/validar-campos')

// Funciones helpers
const { verificarExistenciaIDAlumno } = require('../helpers/validaciones-custom')
const { getAlumnos, createAlumnos, updateAlumnos, deleteAlumnos, getUsuario } = require('../controllers/alumnos');
const { validarExistenciaAlumno } = require('../middlewares/validar-existencia-alumno');
const { validarLimiteAlumnos } = require('../middlewares/validar-limiteAlumnos');


// OBTENER USUARIOS
routes.get('/', getAlumnos)
// routes.get('/', getUsuario)

// CREAR USUARIO
routes.post('/', 
   check('nombre').notEmpty().withMessage('El nombre no debe venir vacio'),      
   check('apellido').notEmpty().withMessage('El apellido no debe venir vacio'),      
   // check('email').isEmail().withMessage('Debe ser un mail valido'),
   check('password').isLength({ min: 6 }).withMessage('El password debe tener un minimo de 6 caracteres'),
   // check('telefono').matches(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/).withMessage('Debe ser un telefono valido'),
   validarcampos, // MiddleWare personalizado, recibe el error de los check()
   validarExistenciaAlumno,
   validarLimiteAlumnos
, createAlumnos)

// ACTUALIZAR USUARIO
routes.put('/:id',
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaIDAlumno(id) ),
   validarcampos // MiddleWare personalizado, recibe el error de los check()
, updateAlumnos)


// DAR DE BAJA USUARIO
routes.delete('/:id',
   validarJWT, // MiddleWare personalizado
   validarRoles, // MiddleWare personalizado
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaIDAlumno(id) ),
   validarcampos // MiddleWare personalizado (recibe los errores de los "chech()")
, deleteAlumnos)


module.exports = routes