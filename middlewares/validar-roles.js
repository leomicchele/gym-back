

function validarRoles(req, res, next) {
   // console.log("USUARIOOO", usuario[0])
   const usuarioAutenticado = req.usuario[0] ? req.usuario[0] : req.usuario[1]

   const rol = usuarioAutenticado.rol
   const nombre = usuarioAutenticado.nombre

   // Verifica que el usuario tenga permiso de administrador
   if(rol !== 'ADMIN_ROL' && rol !== 'PROFESOR_ROL' && rol !== 'GYM_ROL') {
      return res.status(401).json({
         msg: 'No tiene permisos de administrador'
      })
   };

   // Verifica que primero se haya verificado el Token 
   if(!req.usuario) {
      res.status(500).json({
         msg: `No existe usuario ${nombre}, verificar token primero`
      })
   }

   next()

};

module.exports = {
   validarRoles
}