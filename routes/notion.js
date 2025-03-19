const routes = require('express').Router();
const { check } = require('express-validator');

const { enviarFormularioNotion } = require('../controllers/notion');
const { validarcampos } = require('../middlewares/validar-campos');

// Ruta para enviar formulario a Notion
routes.post('/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('mail', 'El email no es válido').isEmail(),
    validarcampos
  ],
  enviarFormularioNotion
);

module.exports = routes; 