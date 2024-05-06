const {Schema, model } = require('mongoose');

const GimnasioSchema = new Schema({
   nombre: String,
   dni: String,
   password: String,
   email: String,
   rol: {
      type: String,
      default: 'GYM_ROL'
   },
   estado: {
      type: Boolean,
      default: true
   },
   limiteAlumnos: {
      type: Number,
      default: 0
   },
   fechaCreacion: {
      type: Date
   }
})

const Gimnasio = model('Gimnasio', GimnasioSchema);

module.exports = Gimnasio