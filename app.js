require('dotenv').config()
const express    = require('express');
const cors       = require('cors');
const fileUpload = require('express-fileupload');


const routesAuth = require('./routes/auth')
const routesBuscar = require('./routes/buscar')
const routesCategorias = require('./routes/categorias')
const routesProductos = require('./routes/productos')
const routesUsuarios = require('./routes/usuarios')
const routesAlumnos = require('./routes/alumnos')
const routesProfesores = require('./routes/profesores')
const routesGimnasios = require('./routes/gimnasios')
const routesRutina = require('./routes/rutina')
const routesHistorial = require('./routes/historial')
const routesUploads = require('./routes/uploads')
const routerViews = require('./routes/views')
const routesNotion = require('./routes/notion')
const routesImages = require('./routes/images')
const routesPagos = require('./routes/pagos')
const routesLogs = require('./routes/logs')
const { conectandoDB } = require('./db/config');
const { socketController } = require('./controllers/socket');
// Variables y Server
const app    = express();
const server = require('http').Server(app); // Creamos servidor http 
// const io     = require('socket.io')(server); 
const port   = process.env.PORT

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
app.use('/api/alumnos', routesAlumnos);
app.use('/api/profesores', routesProfesores);
app.use('/api/gimnasios', routesGimnasios);
app.use('/api/rutina', routesRutina);
app.use('/api/historial', routesHistorial);
app.use('/api/uploads', routesUploads);
app.use('/api/formulario', routesNotion);
app.use('/api/images', routesImages);
app.use('/api/pagos', routesPagos);
app.use('/home', routerViews)
app.use('/api/logs', routesLogs)

// Socket
// io.on('connection', socketController)



server.listen(port, () => {
   console.log('Servidor corriendo en el puerto ', port)
})

// exportar
module.exports = app;