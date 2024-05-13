const jwt = require('jsonwebtoken');
const claveSecreta = process.env.CLAVE_FIRMA

function generadorJWT(datos) {
   return new Promise((resolve, reject) => {
      jwt.sign(datos, claveSecreta, (err, token) =>{
         if(err){
            reject('El JWT no se genero')
         } else {
            resolve(token)
         }
      })
   })
}

module.exports = {
   generadorJWT
}