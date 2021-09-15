const Usuario = require("../models/usuario")


async function mostrarHome(req, res) {
  const id = req.usuario.id // req.usuario lo genera el validarJWT
  
  let usuario = await Usuario.findById(id)

  if(!usuario || !usuario.estado) {
    return res.render('404')
  }

  res.status(200).json({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    telefono: usuario.telefono,
    img: usuario.img || '',
    rol: usuario.rol

  })
};


module.exports = {
   mostrarHome
}