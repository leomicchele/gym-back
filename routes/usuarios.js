const routes = require('express').Router();
const { check } = require('express-validator')

const { validarcampos } = require('../middlewares/validar-campos')
const {verificarExistenciaEmail, verificarExistenciaID} = require('../helpers/validaciones-db')
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario} = require('../controllers/usuarios')



routes.get('/', getUsuarios)

routes.post('/', 
   check('nombre').notEmpty().withMessage('El nombre no debe venir vacio'),      
   check('email').isEmail().withMessage('Debe ser un mail valido'),
   check('password').isLength({ min: 6 }).withMessage('El password debe tener un minimo de 6 caracteres'),
   check('telefono').matches(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/).withMessage('Debe ser un telefono valido'),
   check('email').custom( (email) => verificarExistenciaEmail(email) ), 
   validarcampos // MiddleWare personalizado
, createUsuario)

routes.put('/:id',
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaID(id) ),
   validarcampos
, updateUsuario)

routes.delete('/:id',
   check('id').isMongoId().withMessage('El ID debe ser valido'), 
   check('id').custom( id => verificarExistenciaID(id) ),
   validarcampos
, deleteUsuario)


module.exports = routes