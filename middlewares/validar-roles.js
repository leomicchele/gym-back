

function validarRoles(req, res, next) {
   // console.log(usuario[0])

   const rol = req.usuario[0].rol
   const nombre = req.usuario[0].nombre

   // Verifica que el usuario tenga permiso de administrador
   if(rol !== 'ADMIN_ROL' && rol !== 'PROFESOR_ROL') {
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