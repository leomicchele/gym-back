

function existeArchivo(req, res, next) {

   // Verifica que se haya enviado un archivo 
   if(!req.files || !req.files.archivo) {
      return res.status(400).json({
         msg: 'No se envio ningun archivo'
      });
   }

   next()
}

module.exports = {
   existeArchivo
}