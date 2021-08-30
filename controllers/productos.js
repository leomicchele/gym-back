const Categoria = require("../models/categoria")
const Producto = require("../models/producto")

// OBTENER PRODUCTOS
async function obtenerProductos(req, res) {
   const { limite, desde } = req.query

   try {
      const productos = await Producto.find({estado: true}, 'nombre precio descripcion usuario categorias')
      .populate('categoria', 'nombre')
      .populate('usuario', 'nombre apellido email')
      .skip(Number(desde))
      .limit(Number(limite))

      res.status(200).json({
         msg:'Productos obtenidos',
         productos
      })
   } catch (error) {
      console.log('[ERROR EN OBTENER PRODUCTOS]',err)
      res.status(500).json({
         msg:'Problema en obtener los productos'
      })
   }
}

// OBTENER UN PRODUCTO
async function obtenerProducto(req, res) {
   const id = req.params.id

   try {
      const {nombre, precio, descripcion, usuario, categoria} = await Producto.findOne({_id: id})
      .populate('usuario', 'nombre apellido')
      .populate('categoria', 'nombre')   

      res.status(200).json({
         msg:'Producto Obtenido',
         nombre,
         precio,
         descripcion,
         categoria: categoria.nombre,
         usuario: usuario.nombre + ' '+ usuario.apellido
      })

   } catch (err) {
      console.log('[ERROR EN OBTENER UN PRODUCTO]',err)
      res.status(500).json({
         msg:'Problema en obtener un producto'
      })
   }

   
}

// CREAR PRODUCTOS
async function crearProducto(req, res) {

   const { nombre, precio, categoria, descripcion } = req.body
   const usuarioCreador = req.usuario 

   try {
      const categoriaObj = await Categoria.findOne({nombre: categoria.toUpperCase()})

      const data = {
         nombre: nombre.toLowerCase(),
         precio: precio,
         descripcion: descripcion,
         categoria: categoriaObj,
         usuario: usuarioCreador
      }

      const productoNuevo = new Producto(data)
      const producto = await productoNuevo.save()

      res.status(201).json({
         msg: 'Producto Creado',
         producto
      })   
   } catch (error) {
      console.log('[ERROR EN CREAR PRODUCTOS]',err)
      res.status(500).json({
         msg:'Problema en crear un producto'
      })
   }
   
};

// ACTUALIZAR PRODUCTO
async function actualizarProducto(req, res) {
   const body = req.body
   const id = req.params.id

   try {
      // Verifica si la categoria viene con nombre
      if(body.categoria) {
         const categoriaObj = await Categoria.findOne({nombre: req.body.categoria.toUpperCase()});
         body.categoria = categoriaObj
      }   
        
      body.usuario = req.usuario
   
      // Actualiza el Producto
      const productoActualizado = await Producto.findOneAndUpdate({_id: id}, body, {new: true})
         .populate('categoria', 'nombre')
         .populate('usuario', 'nombre apellido email')
   
      // Respuesta
      res.status(201).json({
         msg: 'Producto actualizado',
         Poroducto: productoActualizado
      })
   
   } catch (err) {
      console.log('[ERROR EN ACTUALIZAR UN PRODUCTO]',err)
      res.status(500).json({
         msg:'Problema en actualizar un producto'
      })
   }

   
}

// ELIMINAR UN PRODUCTO
async function eliminarProducto(req, res) {

   const id = req.params.id
   try {
      const productoEliminado = await Producto.findByIdAndUpdate(id, {estado: false, usuario: req.usuario}, {new: true})
         .populate('usuario', 'nombre apellido email')

      res.status(201).json({
         msg:'Producto Eliminado',
         producto: {
            nombre: productoEliminado.nombre,
            precio: productoEliminado.precio,
            estado: productoEliminado.estado,
            disponible: productoEliminado.disponible
         },
         usuario: {
            nombre: `${productoEliminado.usuario.nombre} ${productoEliminado.usuario.apellido}`,
            email: productoEliminado.usuario.email
         } 
         
      })

   } catch (err) {
      console.log('[ERROR EN BORRAR UN PRODUCTO]',err)
      res.status(500).json({
         msg:'Problema en borrar un producto'
      })
   }
   
}

module.exports = {   
   obtenerProductos,
   obtenerProducto,
   crearProducto,
   actualizarProducto,
   eliminarProducto
}