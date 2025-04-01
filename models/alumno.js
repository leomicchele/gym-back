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
   altura: {
      type: String,
      default: ''   
   },
   peso: {
      type: String,
      default: ''
   },
   grasaCorporal: {
      type: String,
      default: ''
   },
   // email: String,
   // telefono: String,
   // direccion: String,
   // ciudad: String,
   // codigoPostal: String,
   // fechaNacimiento: String,
   caducacionRutina: String,
   profesor: {
      type: Schema.Types.ObjectId,
      ref: 'Profesor',
      default: '66060519b330522580eb70d3'
   },
   gimnasio: {
      type: Schema.Types.ObjectId,
      ref: 'Gimnasio',
      default: '662fdd8e0bc4a4527cb078eb'
   },
   rol: {
      type: String,
      default: 'ALUMNO_ROL'
   },
   estado: {
      type: Boolean,
      default: true
   },
   rutinaId: {
      type: Schema.Types.ObjectId,
      ref: 'Rutina'
   },
   historialId: {
      type: Schema.Types.ObjectId,
      ref: 'Historial'
   },
   pagosId: {
      type: Schema.Types.ObjectId,
      ref: 'Pago'
   },
   rutina: [],
   fechaCreacion: {
      type: Date
   }
})

const Alumno = model('Alumno', AlumnoSchema);

module.exports = Alumno