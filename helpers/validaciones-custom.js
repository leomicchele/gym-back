const { findOne } = require('../models/categoria');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

// ----------------------- USUARIOS -----------------------

async function verificarEmailRegitro(email) {   
   const emailExiste = await Usuario.findOne({ email: email });
   
   if (emailExiste) {
     throw new Error('El Email ya existe')
   }
};

async function verificarExistenciaID(id) {
  const existeID = await Usuario.findById(id);

  if (!existeID) {
    throw new Error("El ID no existe");
  }
};

async function verificarEmailLogin(email) {
  const emailExiste = await Usuario.findOne({ email: email });

   if (!emailExiste) {
     throw new Error(' El mail o la contraseña no son validos - email')
   }
};

// ----------------------- CATEGORIAS -----------------------

async function verificarCategoriaNombre(nombre) {
  // pasamos el nombre recibido a mayusculas para compararlo con la DB
  const nombreUpp = nombre.toUpperCase()

  const existeNombre = await Categoria.findOne( { nombre: nombreUpp } )
  
  if(existeNombre) {
    throw new Error(`La categoria ${nombre} ya existe`)
  }
};


async function verificarCategoriaID(id) {
  const existeID = await Categoria.findOne({_id: id});

  if(!existeID) {
    throw new Error(`El ID ${id} de la categoria no existe`)
  }

}

// ----------------------- PRODUCTOS -----------------------

async function verificaProductoNombre(nombre) {

  const existeNombre = await Producto.findOne({ nombre: nombre.toLowerCase()})
  
  if(existeNombre) {
    throw new Error(`El producto --${nombre}-- ya existe`)
  }
};

async function categoriaNombre(nombre) {

  if(!nombre) {
    return
  }

  // pasamos el nombre recibido a mayusculas para compararlo con la DB
  const nombreUpp = nombre.toUpperCase()

  const existeNombre = await Categoria.findOne( { nombre: nombreUpp } )
  
  if(!existeNombre) {
    throw new Error(`La categoria --> ${nombre} <-- no existe`)
  }
};

async function verificaProductoID(id) {
  const existeID = await Producto.findOne({_id: id});
  if(!existeID){
    throw new Error(`El ID --> ${id} <-- no existe`)
  }
};

async function verificaColeccion(coleccion = '', colecciones = []) {
  
  if(!colecciones.includes(coleccion)) {

    throw new Error(`La coleccion -- ${coleccion} --  no existe, ${colecciones}`)
  }  
}

module.exports = {
   verificarEmailRegitro,
   verificarExistenciaID,
   verificarEmailLogin,
   verificarCategoriaNombre,
   verificarCategoriaID,
   verificaProductoNombre,
   categoriaNombre,
   verificaProductoID,
   verificaColeccion
}
