const {Schema, model } = require('mongoose');

const categoriasSchema = Schema({
   nombre: String,
   estado: {
      type: Boolean,
      default: true,
   },
   usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario'
   }
});

const Categoria = model('Categoria', categoriasSchema)

module.exports = Categoria