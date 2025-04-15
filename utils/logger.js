const Log = require("../models/log");


async function logEvent({ message, level = 'info', action = '', user = null, metadata = {} }) {
  try {
    await Log.create({
      message,
      level,
      action,
      user,
      metadata
    });
  } catch (err) {
    console.error('Error al guardar el log:', err.message);
  }
}

module.exports = logEvent;