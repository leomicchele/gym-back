const path = require('path');
const { uuid } = require('uuidv4');

function guardarArchivo(archivo, extensionesPermitidas, carpeta = '') {
   return new Promise((resolve, reject) => {

      // Averiguamos la extension del archivo
      const nombreCortado = archivo.name.split('.');
      const extension = nombreCortado[nombreCortado.length - 1]

      // Verificamos que la extension sea la que necesitemos
      if(!extensionesPermitidas.includes(extension)) {
         return reject ({
            status: 400,
            msg: `La extension -- ${ extension } -- no es permitida`
         })
      }

      // Cambiar el nombre del archivo antes de guardarlo
      const nuevoNombre = uuid() + '.' + extension;
      
      // Guarda el archivo recibido en la carpeta /uploads/
      archivo.mv(path.join(__dirname, '../uploads', carpeta,  nuevoNombre), (err)=> {
         if(err) {
            return reject ({
               status: 500,
               msg: `Error interno`
            })
         }
      })

      // Promesa resuleta correctamente
      resolve({
         status: 201,
         msg: 'Archivo Guardado correctamente',
         nombre: nuevoNombre
      })
   })
};

module.exports = {
   guardarArchivo
}