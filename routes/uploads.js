const routes = require('express').Router()
const { check } = require('express-validator');

const { subirArchivos, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { verificaColeccion } = require('../helpers/validaciones-custom');
const { existeArchivo } = require('../middlewares/validar-archivo');
const { validarcampos } = require('../middlewares/validar-campos');



// SUBIR IMAGEN
routes.post('/', existeArchivo, subirArchivos)


// ACTUALIZAR IMAGEN DE USUARIOS O PRODUCTOS
routes.put('/:coleccion/:id',
existeArchivo,
check('id').isMongoId().withMessage('No es un ID válido de Mongo'),
check('coleccion').custom((coleccion) => verificaColeccion(coleccion, ['usuarios', 'productos'])),
validarcampos
, actualizarImagenCloudinary)

// MOSTRAR IMAGEN
routes.get('/:coleccion/:id',
check('id').isMongoId().withMessage('No es un ID válido de Mongo'),
check('coleccion').custom((coleccion) => verificaColeccion(coleccion, ['usuarios', 'productos'])),
validarcampos
, mostrarImagen)

module.exports = routes

