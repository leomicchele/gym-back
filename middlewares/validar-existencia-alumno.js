const Alumno = require("../models/alumno");


async function validarExistenciaAlumno(req, res, next) {

   const {dni, rol, gimnasio} = req.body

   const existeAlumno = await Alumno.find({dni});
 
   if ((existeAlumno.length > 0) && (existeAlumno[0].dni === dni) && (existeAlumno[0].gimnasio.toString() === gimnasio)) {
      return res.status(400).json({
         msg: 'Alumno ya existe'
      })
   }

   next()

};

module.exports = {
   validarExistenciaAlumno
}