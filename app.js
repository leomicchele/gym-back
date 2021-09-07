require('dotenv').config()
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const routesAuth = require('./routes/auth')
const routesBuscar = require('./routes/buscar')
const routesCategorias = require('./routes/categorias')
const routesProductos = require('./routes/productos')
const routesUsuarios = require('./routes/usuarios')
const routesUploads = require('./routes/uploads')
const routerViews = require('./routes/views')
const {conectandoDB} = require('./db/config')

// Variables
const app = express();
const port = process.env.PORT

// Conectando a DB
conectandoDB();

// Meddleware
app.use(cors());
app.use(express.json());
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(fileUpload({ 
   useTempFiles : true,
   tempFileDir : '/tmp/',
   createParentPath: true
}));

// Rutas
app.use('/api/auth', routesAuth);
app.use('/api/buscar', routesBuscar);
app.use('/api/categorias', routesCategorias);
app.use('/api/productos', routesProductos);
app.use('/api/usuarios', routesUsuarios);
app.use('/api/uploads', routesUploads);
app.use('/home', routerViews)


app.listen(port, () => {
   console.log('Servidor corriendo en el puerto ', port)
})