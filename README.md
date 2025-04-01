# Gym-Back - Backend para Sistema de Gestión de Gimnasios

## Descripción
Backend completo para sistema de gestión de gimnasios con:
- Autenticación JWT y Google OAuth
- Gestión de alumnos, profesores, rutinas y gimnasios
- API RESTful
- WebSockets para chat en tiempo real
- Subida de imágenes a Cloudinary
- Integración con Notion API

## Tecnologías Principales
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- Cloudinary
- JWT
- Google Auth
- Handlebars (vistas básicas)

## Instalación
1. Clonar repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Configurar variables de entorno (crear .env basado en .env.example)

## Variables de Entorno
```
PORT=
MONGODB_URI=
CLOUDINARY_URL=
GOOGLE_CLIENT_ID=
JWT_SECRET=
NOTION_API_KEY=
NOTION_DATABASE_ID=
```

## Estructura de Directorios
```
├── api/            # Endpoints API
├── controllers/    # Lógica de controladores  
├── db/             # Configuración de base de datos
├── helpers/        # Utilidades (JWT, validaciones)
├── middlewares/    # Middlewares
├── models/         # Modelos de MongoDB
├── public/         # Frontend principal
├── public2/        # Frontend alternativo
├── routes/         # Definición de rutas
└── views/          # Vistas Handlebars
```

## Endpoints Principales
- Auth: `/api/auth`
- Usuarios: `/api/usuarios` 
- Alumnos: `/api/alumnos`
- Profesores: `/api/profesores`
- Gimnasios: `/api/gimnasios`
- Rutinas: `/api/rutinas`
- Productos: `/api/productos`
- Imágenes: `/api/uploads`

## Comandos
```bash
npm start    # Inicia producción
npm run dev  # Inicia desarrollo con nodemon
```

## Licencia
ISC
