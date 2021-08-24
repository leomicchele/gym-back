const Usuario = require('../models/usuario');

async function verificarEmailRegitro(email) {   
   const emailExiste = await Usuario.findOne({ email: email });
   
   if (emailExiste) {
     throw new Error('El Email existe')
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

module.exports = {
   verificarEmailRegitro,
   verificarExistenciaID,
   verificarEmailLogin
}
