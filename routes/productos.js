const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt')
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos')
const { validarcampos } = require('../middlewares/validar-campos');
const { verificaProductoNombre, categoriaNombre, verificaProductoID } = require('../helpers/validaciones-custom');
const { validarRoles } = require('../middlewares/validar-roles');

const routes = require('express').Router()

// OBTENER PRODUCTOS
routes.get('/', obtenerProductos)

// OBTIENE UN PRODUCTO
routes.get('/:id',
   check('id').isMongoId().withMessage('No es un id valido de Mongo'),
   check('id').custom((id) => verificaProductoID(id)),
   validarcampos // MiddleWare personalizado (recibe los errores de los "chech()")
,  obtenerProducto)

// CREA UN PRODUCTO
routes.post('/',
   validarJWT,
   check('nombre').notEmpty().withMessage('El nombre no debe venir vacio'),
   check('categoria').notEmpty().withMessage('La categoria no debe venir vacio'),
   check('nombre').custom((nombre) => verificaProductoNombre(nombre) ),
   check('categoria').custom((categoria) => categoriaNombre(categoria) ),
   validarcampos // MiddleWare personalizado (recibe los errores de los "chech()")
, crearProducto)

// ACTUALIZAR PRODUCTO
routes.put('/:id',
   validarJWT,
   check('id').isMongoId().withMessage('No es un id valido de Mongo'),
   check('id').custom((id) => verificaProductoID(id)),
   check('categoria').custom((categoria) => categoriaNombre(categoria) ),
   validarcampos // MiddleWare personalizado (recibe los errores de los "chech()")
   ,actualizarProducto)


routes.delete('/:id',
   validarJWT,
   validarRoles,
   check('id').isMongoId().withMessage('No es un id valido de Mongo'),
   check('id').custom((id) => verificaProductoID(id)),
   validarcampos // MiddleWare personalizado (recibe los errores de los "chech()")
   , eliminarProducto)

module.exports = routes