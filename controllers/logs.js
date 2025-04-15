
const Log = require('../models/log');

// OBTENER Logs
async function getLogs(req, res) {

   try {
      if (req.query.limite) {
         const { limite, desde } = req.query;

      const logs = await Log.find()
         .skip(Number(desde))
         .limit(Number(limite));

         res.status(200).json(logs);

      } else {
         const logs = await Log.find();
         res.status(200).json(logs);
      }

   } catch (error) {
      console.log('La peticion no se realizo en getLogs: ', error)
      logEvent({
         message: `Error al obtener los logs`,
         action: 'Get Logs',
         level: 'error',
         metadata: { error: error }
      });
      res.status(500).json({
         msg: 'La peticion no se realizo',
      })
   }
}

module.exports = {
   getLogs
}
