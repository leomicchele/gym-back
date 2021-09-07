const Usuario = require("../models/usuario")


async function mostrarHome(req, res) {
  const id = req.params.id
  
  let usuario = await Usuario.findById(id)

  if(!usuario || !usuario.estado) {
    return res.render('404')
  }
  
  // Verifica si tiene imagen, sino le da una por defecto
  if(!usuario.img) {
    img = '/assets/no-image.jpg'
  }

  // Renderiza el Home
  res.render('home', {
    nombre: `${usuario.nombre} ${usuario.apellido}`,
    email: `EMAIL: ${usuario.email}`,
    telefono: `TELEFONO: ${usuario.telefono}`,
    img: usuario.img
  })
};


module.exports = {
   mostrarHome
}