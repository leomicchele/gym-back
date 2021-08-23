const Usuario = require('../models/usuario')

async function verificarExistenciaEmail(email) {   
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

module.exports = {
   verificarExistenciaEmail,
   verificarExistenciaID
}
