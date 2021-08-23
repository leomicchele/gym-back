require('dotenv').config()
const express = require('express');
const cors = require('cors');

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
app.use('/api/usuarios', routesUsuarios)


app.listen(port, () => {
   console.log('Servidor corriendo en el puerto ', port)
})