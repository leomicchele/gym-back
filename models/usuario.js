const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
   nombre: String,
   email: String,
   password: String,
   img: String,
   telefono: Number,
   rol: String,
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