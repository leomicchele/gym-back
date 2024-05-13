const {Schema, model } = require('mongoose');

const HistorialSchema = new Schema({
   historial: []
})

const Historial = model('Historial', HistorialSchema);

module.exports = Historial