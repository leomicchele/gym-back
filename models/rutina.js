const {Schema, model } = require('mongoose');

const RutinaSchema = new Schema({
   caducacionRutina: String,
   fechaActualizacionProfesor: Number,
   fechaActualizacionAlumno: Number,
   fechaDescargaRutina: Number,
   fechaCreacion: Number,
   rutina: []
})

const Rutina = model('Rutina', RutinaSchema);

module.exports = Rutina