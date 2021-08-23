const {validationResult} = require('express-validator')


function validarcampos(req, res, next) {
   
   const errorValidacion = validationResult(req)

   if(!errorValidacion.isEmpty()) {
      
      return res.status(400).json(errorValidacion)
   }

   next()
}

module.exports = {
   validarcampos
}