const {Schema, model } = require('mongoose');

const RutinaSchema = new Schema({
   caducacionRutina: String,
   rutina: []
})

const Rutina = model('Rutina', RutinaSchema);

module.exports = Rutina