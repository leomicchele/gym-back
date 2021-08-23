const mongoose = require('mongoose');


async function conectandoDB() {

   try {
      await mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log('Base de datos CONECTADA')
      
   } catch (error) {      
      console.log(error)
   }
};

module.exports = {
   conectandoDB
}