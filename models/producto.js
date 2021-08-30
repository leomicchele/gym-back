const { Schema, model } = require('mongoose');

const productoSchema = Schema({
   nombre: String,
   descripcion: String,
   precio: {
      type: Number,
      default: 0
   },
   disponible: {
      type: Boolean,
      default: true
   },
   estado: {
      type: Boolean,
      default: true
   },
   usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario'
   },
   categoria: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria'
   }   
})

const Producto = model('producto', productoSchema)

module.exports = Producto