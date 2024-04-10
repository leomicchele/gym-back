const routes = require('express').Router();
const {check} = require('express-validator')

const { login, loginGoogle } = require('../controllers/auth');
const { verificarEmailLogin } = require('../helpers/validaciones-custom');
const { validarcampos } = require('../middlewares/validar-campos');

// LOGUEA USUARIO
routes.post('/login',
   // check('email').isEmail().withMessage('Debe ser un email valido'),
   // check('email').custom( email => verificarEmailLogin(email)),
   check('password').notEmpty().isLength({ min: 6 }).withMessage('El password debe tener un minimo de 6 caracteres'),
   validarcampos
, login)

// LOGUEA USUARIO CON GOOGLE
routes.post('/google',
   check('id_token').notEmpty().withMessage('El token de Google no es valido'),
   validarcampos
, loginGoogle)


module.exports = routes