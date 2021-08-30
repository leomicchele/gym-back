const routes = require('express').Router()

const { buscar } = require('../controllers/buscar')

// BUSCAR
routes.get('/:coleccion/:termino', buscar)

module.exports = routes