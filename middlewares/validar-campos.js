const {validationResult} = require('express-validator')

// Middleware requerido para recibir los errrores de los "Check()"
function validarcampos(req, res, next) {

   console.info(req)

   
   const errorValidacion = validationResult(req)

   if(!errorValidacion.isEmpty()) {
      
      return res.status(400).json(errorValidacion)
   }

   next()
}

module.exports = {
   validarcampos
}