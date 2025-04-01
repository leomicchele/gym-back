const {Schema, model } = require('mongoose');

const PagoSchema = new Schema({
   pagos: []
})

const Pago = model('Pago', PagoSchema);

module.exports = Pago