const Alumno = require("../models/alumno");
const Gimnasio = require("../models/gimnasio");
const Profesor = require("../models/profesor");


async function validarLimiteAlumnos(req, res, next) {
   // 662fdd8e0bc4a4527cb078eb Gimnasio de Anubis
   const { gimnasio, profesor } = req.body
   let respuesta;

   if (profesor !== null) { // Si lo crea el profesor al alumno, verifica si el limite de alumnos se alcanzo
      respuesta = await Promise.all([
         Alumno.countDocuments({ profesor: profesor }),
         Profesor.find({ _id: profesor })
      ])

      if (respuesta[1][0].gimnasio.toString() === "662fdd8e0bc4a4527cb078eb") { // Si el profesor es de Anubis, verifica el limite de alumnos del profesor
         if (respuesta[0] >= respuesta[1][0]?.limiteAlumnos && respuesta[1][0]?.limiteAlumnos !== 0) {
            return res.status(400).json({
               msg: 'Has alcanzado el limite de alumnos'
            })
         }
      }


   } else { // Si lo crea el gimnasio al alumno, verifica si el limite de alumnos se alcanzo
      respuesta = await Promise.all([
         Alumno.countDocuments({ gimnasio: gimnasio }),
         Gimnasio.find({ _id: gimnasio })
      ])
      if (respuesta[0] >= respuesta[1][0]?.limiteAlumnos && respuesta[1][0]?.limiteAlumnos !== 0) {
         return res.status(400).json({
            msg: 'Has alcanzado el limite de alumnos'
         })
      }

   }

   next()

};

module.exports = {
   validarLimiteAlumnos
}