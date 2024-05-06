const Gimnasio = require("../models/gimnasio");
const Profesor = require("../models/profesor");


async function validarExistenciaProfesor(req, res, next) {

   const {dni, rol, gimnasio, email} = req.body

   const respuesta = await Promise.all([       // Cuenta a los que estan dados de alta
      Gimnasio.find({email: email}),
      Profesor.find({email: email})
   ])

   if ((respuesta[0].length !== 0) || (respuesta[1].length !== 0)) {
      return res.status(400).json({
         msg: 'El Email ya existe'
      })
      
   }

   // const existeProfesor = await Profesor.find({dni});
 
   // if ((existeProfesor.length > 0) && (existeProfesor[0].dni === dni) && (existeProfesor[0].gimnasio.toString() === gimnasio)) {
   //    return res.status(400).json({
   //       msg: 'Profesor ya existe'
   //    })
   // }

   next()

};

module.exports = {
   validarExistenciaProfesor
}