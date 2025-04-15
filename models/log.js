const {Schema, model } = require('mongoose');

const LogSchema = new Schema({
   message: { type: String, required: true },            // Descripción del evento
   level: { type: String, enum: ['info', 'warn', 'error'], default: 'info' },
   action: { type: String },                              // Ej: "create_rutina", "update_alumno"
   metadata: { type: Object },                            // Datos adicionales (IDs, cambios, etc.)
   createdAt: { type: Date, default: Date.now }
 })

const Log = model('Log', LogSchema);

module.exports = Log