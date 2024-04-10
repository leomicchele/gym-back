const {Schema, model } = require('mongoose');

const AlumnoSchema = new Schema({
   nombre: String,
   apellido: String,
   edad: String,
   dni: String,
   password: String,
   experiencia: String,
   lesion: String,
   patologia: String,
   objetivo: String,
   diasSemanales: String,
   deporte: String,
   profesor: {
      type: Schema.Types.ObjectId,
      ref: 'Profesor',
      default: '66060519b330522580eb70d3'
   },
   gimnasio: {
      type: Schema.Types.ObjectId,
      ref: 'Gimnasio',
      default: '66060519b330522580eb70d3'
   },
   rol: {
      type: String,
      default: 'USER_ROL'
   },
   estado: {
      type: Boolean,
      default: true
   },
   rutina: [
      {
         type: Object,
         default: {
            dia1: {},
            dia2: {},
            dia3: {},
            dia4: {},
            dia5: {}
         }
      }
   ]
})

const Alumno = model('Alumno', AlumnoSchema);

module.exports = Alumno