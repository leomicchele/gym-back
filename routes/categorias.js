const routes = require('express').Router();

const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { verificarCategoriaNombre, verificarCategoriaID } = require('../helpers/validaciones-custom');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');

// OBTENER CATEGORIAS
routes.get('/', obtenerCategorias)

// OBTENER UNA CATEGORIA
routes.get('/:id',
   check('id').isMongoId().withMessage('No es un id valido de mongo'),
   check("id").custom((id) => verificarCategoriaID(id)),
   validarcampos
   ,obtenerCategoria)

// CREAR UNA CATEGORIA
routes.post('/', 
   validarJWT,  
   check('nombre').notEmpty().withMessage('El nombre no debe venir vacio'),
   check('nombre').custom((nombre) => verificarCategoriaNombre(nombre)), 
   validarcampos // MiddleWare personalizado (recibe los errores de los "chech()")
   ,crearCategoria);
   
// ACTUALIZAR CATEGORIA
routes.put( "/:id",
  validarJWT,
  check("id").isMongoId().withMessage("No es un id valido de mongo"),
  check("id").custom((id) => verificarCategoriaID(id)),
  validarcampos, // MiddleWare personalizado (recibe los errores de los "chech()")
  actualizarCategoria);

// BORRAR UNA CATEGORIA - SOLO ADMIN
routes.delete('/:id', 
   validarJWT,
   validarRoles,
   check('id').isMongoId().withMessage('No es un id valido de mongo'),
   check("id").custom((id) => verificarCategoriaID(id)),
   validarcampos
   ,borrarCategoria)

module.exports = routes