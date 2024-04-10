const {Schema, model } = require('mongoose');

const GimnasioSchema = new Schema({
   nombre: String,
   dni: String,
   password: String,
   rol: {
      type: String,
      default: 'GYM_ROL'
   },
   estado: {
      type: Boolean,
      default: true
   }
})

const Gimnasio = model('Gimnasio', GimnasioSchema);

module.exports = Gimnasio