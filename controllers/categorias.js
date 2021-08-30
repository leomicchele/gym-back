
const Categoria = require('../models/categoria');

// OBTENER CATEGORIAS
async function obtenerCategorias(req, res) {

  const {limite, desde} = req.query
  
  try {
    // trae la cantidad total de categorias, 
    // trae todas las categorias con las propiedades nombre y estado,
    // y trae la coleccion 'usuario', que se encuentra en una de sus propiedades
    const categorias = await Promise.all([
      Categoria.countDocuments(),
      Categoria.find(null, 'nombre estado')
      .skip(Number(desde))
      .limit(Number(limite))
      .populate({ path: 'usuario', select: '_id nombre apellido'})
    ])

    res.status(200).json({
      msg: 'Se obtuvo correctamente',
      cantidadCategorias: categorias[0],
      categorias: categorias[1],
    })    

  } catch (err) {
    console.log('[Error - ObtenerCategorias]', err);
    res.status(400).json({
      msg: 'Error en obtener categorias'
    })
  }
  
}

// OBTENER UNA CATEGORIA
async function obtenerCategoria(req, res) {
  
  try {
    // busca una categoria por id, nos la trae con las propiedades de estado, nombre e id,
    // y trae tambien la coleccion 'usuario' que es una coleccion anidada en una de sus propiedades 
    const categoria = await Categoria.findOne({_id: req.params.id}, 'estado nombre _id').populate({path: 'usuario', select: '_id nombre apellido'})

    // Respuesta
    res.status(200).json({
      msg: 'Categoria obtenida',
      categoria
  })

  } catch (err) {
    console.log('[Error - ObtenerCategoria]', err);
    res.status(400).json({
      msg: 'Error en obtener una categoria'
    })
  }
}

// CREAR CATEGORIA
async function crearCategoria(req, res) {

   // pasamos el nombre recibido a mayusculas, y asi guardarlo
  const nombre = req.body.nombre.toUpperCase()

  const data = {
      nombre: nombre, 
      estado: true,
      usuario: req.usuario._id // Esto lo devuelve varifica-jwt.js
  }

  try {
     // Crea un documento nuevo 
     const categoriaNueva = new Categoria(data);

     //lo guardamos en DB
     await categoriaNueva.save();

     // Respuesta al cliente
     res.status(201).json({
       msg: "Categoria Creada",
       categoria: categoriaNueva,
    });

  } catch (err) {
     res.status(500).json({
       msg: "Problema interno, no se puedo guardar la categoria",
    });
  }
};

// ACTUALIZAR CATEGORIA
async function actualizarCategoria(req, res) {

  const { nombre, estado } = req.body
  const categoriaID = req.params.id

  try {
    // Actualiza la categoria y la guarda actualizada en la variable
    const categoriaDatos = await Categoria.findOneAndUpdate(categoriaID, { nombre: nombre.toUpperCase(), estado: estado,usuario: req.usuario}, {new: true})
      .populate('usuario', 'nombre apellido');

    
    // respuesta al cliente
    res.status(201).json({
      msg: "Categoria Actualizada",
      categoriaActualizada: {
        nombre: categoriaDatos.nombre,
        estado: categoriaDatos.estado,
        usuario: categoriaDatos.usuario
      }
    });

  } catch (err) {
    console.log("[ERROR EN LA ACTUALIZACION]  ", err);
    res.status(400).json({
      msg: "Error en actualizar la categoria",
    });
  }
}

// BORRAR CATEGORIA
async function borrarCategoria(req, res) {
  const categoriaID = req.params.id
  const usuarioActual = req.usuario

  try {
    // Actualiza la categoria a estado: false
    const categoriaDatos = await Categoria.findByIdAndUpdate(categoriaID, {estado: false, usuario: usuarioActual}, {new: true})
      .populate('usuario', 'nombre apellido');
    
    // respuesta al cliente
    res.status(201).json({
      msg: 'Categoria borrada',
      categoriaBorrada: {
        nombre: categoriaDatos.nombre,
        estado: categoriaDatos.estado,
        usuario: categoriaDatos.usuario
      }
    })

  } catch (err) {
    console.log('[ERROR EN BORRAR CATEGORIA]  ', err)
    res.status(400).json({
      msg: 'Error en borrar la categoria'
    })
  }
}

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria
}