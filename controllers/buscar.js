const { ObjectId } = require('mongoose').Types
const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')

const coleccionesPermitidas = [
   'usuarios',
   'productos',
   'categorias'
]

async function buscar(req, res) {

   const { coleccion, termino } = req.params

   if ( !coleccionesPermitidas.includes(coleccion) ) {
      return res.status(400).json({
         msg: `La coleccion --> ${coleccion} <-- no existe`
      })
   }

   switch (coleccion) {
      case 'usuarios':
         busquedaUsuario(termino, res)
      break;
      case 'categorias':
         busquedaCategorias(termino, res)
      break;
      case 'productos':
         busquedaProductos(termino, res)
      break;
      default:
         break;
   }
   
};


async function busquedaUsuario(termino, res) {
   // Verifica si es un ID
   const esValidoId = ObjectId.isValid(termino)
   
   // Si es un ID
   if(esValidoId) {
      const usuario = await Usuario.findById(termino)
      res.status(200).json({
         result: (usuario) ? [usuario] : []
      })
   }

   // Si no es valido el ID, sigue con esta parte
   const regex = new RegExp(termino, 'i') // Expresion regular que hace busquedas incensibles

   // Busca los usuarios que conincidan en le nombre o($or) el email. Y($and) que tenga un estado true  
   const usuarios = await Usuario.find({
      $or: [{nombre: regex}, {email: regex}],
      $and: [{estado: true}]
   })

   res.status(200).json({
      result: usuarios
   })
}

async function busquedaCategorias(termino, res) {
   // Verifica si es un ID
   const esValidoId = ObjectId.isValid(termino)

   // Si es un ID
   if(esValidoId) {
      const categoria = await Categoria.findById(termino)
      res.status(200).json({
         result: [categoria]
      })
   };

   // Si no es valido el ID, sigue con esta parte
   const regex = new RegExp(termino, 'i'); // Expresion regular que hace busquedas incensibles

   // Busca las categorias que conincidan en el nombre
   const categorias = await Categoria.find({ nombre: regex });
 
   res.status(200).json({
      result: categorias
   })
}

async function busquedaProductos(termino, res) {
   // Verifica si es un ID
   const esValidoId = ObjectId.isValid(termino)

   // Si es un ID
   if(esValidoId) {
      const producto = await Producto.findById(termino).populate('categoria', 'nombre');
      res.status(200).json({
         result: [producto]
      })
   };

   // Si no es valido el ID, sigue con esta parte
   const regex = new RegExp(termino, 'i'); // Expresion regular que hace busquedas incensibles

   // Busca las categorias que conincidan en el nombre
   const productos = await Producto.find({ nombre: regex }).populate('categoria', 'nombre');
 
   res.status(200).json({
      result: productos
   })
}

module.exports = {
   buscar
}