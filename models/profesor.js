const {Schema, model } = require('mongoose');

const ProfesorSchema = new Schema({
   nombre: String,
   apellido: String,
   dni: String,
   password: String,
   email: String,
   gimnasio: {
      type: Schema.Types.ObjectId,
      ref: 'Gimnasio',
      default: '66060519b330522580eb70d3'
   },
   rol: {
      type: String,
      default: 'PROFESOR_ROL'
   },
   estado: {
      type: Boolean,
      default: true
   },
   limiteAlumnos: {
      type: Number,
      default: 0
   },
})

const Profesor = model('Profesor', ProfesorSchema);

module.exports = Profesor