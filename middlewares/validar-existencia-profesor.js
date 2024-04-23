const Profesor = require("../models/profesor");


async function validarExistenciaProfesor(req, res, next) {

   const {dni, rol, gimnasio} = req.body

   const existeProfesor = await Profesor.find({dni});
 
   if ((existeProfesor.length > 0) && (existeProfesor[0].dni === dni) && (existeProfesor[0].gimnasio.toString() === gimnasio)) {
      return res.status(400).json({
         msg: 'Profesor ya existe'
      })
   }

   next()

};

module.exports = {
   validarExistenciaProfesor
}