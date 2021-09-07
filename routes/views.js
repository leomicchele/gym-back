const routes = require('express').Router();
const { check } = require('express-validator');

const { mostrarHome } = require('../controllers/views');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

routes.get('/:id',[
   // validarJWT,
   check('id').isMongoId().withMessage('No es un id valido de Mongo'),
   validarcampos
], mostrarHome);


module.exports = routes 


