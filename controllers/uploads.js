
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { guardarArchivo } = require('../helpers/guardar-archivo');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

const extensionesPermitidas = ['png', 'jpg', 'jpeg', 'gif']

// Guardar archivo en servidor
async function subirArchivos(req, res) {
  
   try {
      // Guarda el archivo
      const { status, msg } = await guardarArchivo(req.files.archivo, extensionesPermitidas, 'imgs')
      
      // Devuelve una respuesta
      res.status(status).json({
         msg: msg
      })     

   } catch (err) {      
      
      res.status(err.status).json({
         msg: err.msg
      })
   }
};

// Guardar y actualizar archivos en el servirod
async function actualizarArchivo(req, res) {

   const { coleccion, id } = req.params   
   let modelo;

   // comprbamos si productos o usuario existen
   switch (coleccion) {
      case 'usuarios':
         modelo = await Usuario.findById(id); // Verifica que exista el usuario
         if(!modelo) {
            return res.status(400).json({msg: 'El ID no existe'})
         }
      
      break;
      case 'productos':
         modelo = await Producto.findById(id); 
         if(!modelo) {
            return res.status(400).json({msg: 'El ID no existe'})
         }
      
      break;   
      default:
         return res.status(500).json({ msg: 'Error en actualizar archivos'})
   };

   // Verificamos si existe una imagen ya guardada en el modelo, y la eliminamos
   if(modelo.img) {
      const ruta = path.join(__dirname, '../uploads', coleccion, modelo.img)
      if(fs.existsSync(ruta)) {
         fs.unlinkSync(ruta)
      }
   }

   // Guarda el archivo y nos traemos el nombre
   const { nombre: nombreImagen } = await guardarArchivo(req.files.archivo, extensionesPermitidas, coleccion)

   // le agregamos el nombre a la propiedad del modelo consultado, y lo guardamos
   modelo.img = nombreImagen
   modelo.save()

   // Respuesta Satifactoria
   res.json({
      msg: 'Archivo Actualizado',
      modelo
   })
}

// Guardar imagenes en Cloudinary
async function actualizarImagenCloudinary(req, res) {

   const { coleccion, id } = req.params   
   let modelo;

   // comprbamos si productos o usuario existen
   switch (coleccion) {
      case 'usuarios':
         modelo = await Usuario.findById(id); // Verifica que exista el usuario
         if(!modelo) {
            return res.status(400).json({msg: 'El ID no existe'})
         }
      
      break;
      case 'productos':
         modelo = await Producto.findById(id); 
         if(!modelo) {
            return res.status(400).json({msg: 'El ID no existe'})
         }
      
      break;   
      default:
         return res.status(500).json({ msg: 'Error en actualizar archivos'})
   };

   // Verificamos si existe una imagen ya guardada en el modelo, y la eliminamos de cloudinary
   if(modelo.img) {
      const url_cortada = modelo.img.split('/')
      const nombreArchivo = url_cortada[url_cortada.length -1]
      const id_cloudinary = nombreArchivo.split('.')
      await cloudinary.uploader.destroy( id_cloudinary[0] ) // Elimina la imagen de Cloudinary
   }

   try {
      // SUbimos la imagen a Cloudinary
      const { tempFilePath } = req.files.archivo // extraemos la ruta temporal
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath) // extraemos la url de la img
      
      // le agregamos el nombre a la propiedad del modelo consultado, y lo guardamos
      modelo.img = secure_url
      modelo.save()
      
   } catch (error) {
      res.status(500).json({
         msg: 'Error al actualizar/guardar imagen'
      })
      console.log(error)      
   }

   // Respuesta Satifactoria
   res.json({
      msg: 'Archivo Actualizado',
      modelo
   })
}

async function mostrarImagen(req, res) {
   const { coleccion, id } = req.params

   let modelo;

   // comprbamos si productos o usuario existen
   switch (coleccion) {
      case 'usuarios':
         modelo = await Usuario.findById(id); // Verifica que exista el usuario
         if(!modelo) {
            return res.status(400).json({msg: 'El ID no existe'})
         }
      
      break;
      case 'productos':
         modelo = await Producto.findById(id); // Verifica que exista el producto
         if(!modelo) {
            return res.status(400).json({msg: 'El ID no existe'})
         }
      
      break;   
      default:
         return res.status(500).json({ msg: 'Error al servir archivos'})
   };

   // Verificamos si existe una imagen ya guardada en el modelo

   // if(modelo.img) { // para el servidor
   //    const ruta = path.join(__dirname, '../uploads', coleccion, modelo.img)

   //    if(fs.existsSync(ruta)) {
   //       // Devuelve la imagen correspondiente
   //       return res.sendFile( ruta )
                  
   //    }
   // } 

   // Si el modelo tiene imagen, devuelve la url de cloudinary
   if(modelo.img) { 
      return res.status(200).json({
         img: modelo.img
      })
   }

   // devuelve una imagen generica
   res.sendFile( path.join(__dirname, '../public/assets/no-image.jpg'))
}

module.exports = {
   subirArchivos,
   actualizarArchivo,
   actualizarImagenCloudinary,
   mostrarImagen,
}