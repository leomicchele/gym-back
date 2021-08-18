

function getUsuarios(req, res) {
   res.json({
      message: 'Estamos en /api/ - GET'
   })
}

function postUsuario(req, res) {
   res.json({
      message: 'Estamos en /api/ - POST',
      body: req.body

   })
}

function patchUsuario(req, res) {
   res.json({
      message: 'Estamos en /api/ - PATCH'
   })

}

function deleteUsuario(req, res) {
   res.json({
      message: 'Estamos en /api/ - DELETE'
   })

}





module.exports = {
   getUsuarios,
   postUsuario,
   patchUsuario,
   deleteUsuario
}

