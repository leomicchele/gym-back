const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
   nombre: String,
   apellido: String,
   email: String,
   password: String,
   img: String,
   telefono: Number,
   rol: {
      type: String,
      default: 'USER_ROL'
   },
   estado: {
      type: Boolean,
      default: true
   },
   google: {
      type: Boolean,
      default: false
   }
})

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario