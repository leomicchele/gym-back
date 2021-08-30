require('dotenv').config()
const express = require('express');
const cors = require('cors');

const routesAuth = require('./routes/auth')
const routesBuscar = require('./routes/buscar')
const routesCategorias = require('./routes/categorias')
const routesProductos = require('./routes/productos')
const routesUsuarios = require('./routes/usuarios')
const {conectandoDB} = require('./db/config')

// Variables
const app = express();
const port = process.env.PORT

// Conectando a DB
conectandoDB();

// Meddleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/api/auth', routesAuth);
app.use('/api/buscar', routesBuscar);
app.use('/api/categorias', routesCategorias);
app.use('/api/productos', routesProductos);
app.use('/api/usuarios', routesUsuarios);


app.listen(port, () => {
   console.log('Servidor corriendo en el puerto ', port)
})