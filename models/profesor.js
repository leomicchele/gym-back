const {Schema, model } = require('mongoose');

const ProfesorSchema = new Schema({
   nombre: String,
   apellido: String,
   dni: String,
   password: String,
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
   }
})

const Profesor = model('Profesor', ProfesorSchema);

module.exports = Profesor