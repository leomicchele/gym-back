const { findOne } = require('../models/categoria');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');

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
// ----------------------- ALUMNOS -----------------------

// async function verificarEmailRegitro(email) {   
//    const emailExiste = await Usuario.findOne({ email: email });
   
//    if (emailExiste) {
//      throw new Error('El Email ya existe')
//    }
// };

async function verificarExistenciaIDAlumno(id) {
  const existeID = await Alumno.findById(id);

  if (!existeID) {
    throw new Error("El ID no existe");
  }
};

// async function verificarEmailLogin(email) {
//   const emailExiste = await Alumno.findOne({ email: email });

//    if (!emailExiste) {
//      throw new Error(' El mail o la contraseña no son validos - email')
//    }
// };
// ----------------------- PROFESORES -----------------------

async function verificarEmailRegitroProfesor(email) {   
   const emailExiste = await Profesor.findOne({ email: email });
   
   if (emailExiste) {
     throw new Error('El Email ya existe')
   }
};


async function verificarExistenciaIDProfesor(id) {
  const existeID = await Profesor.findById(id);

  if (!existeID) {
    throw new Error("El ID no existe");
  }
};

// async function verificarEmailLogin(email) {
//   const emailExiste = await Alumno.findOne({ email: email });

//    if (!emailExiste) {
//      throw new Error(' El mail o la contraseña no son validos - email')
//    }
// };

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
   verificaColeccion,
   verificarExistenciaIDAlumno,
   verificarEmailRegitroProfesor,
   verificarExistenciaIDProfesor
}
