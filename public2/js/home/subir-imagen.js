const $inputImagen = document.querySelector('#inputArchivo')
const $formElem = document.querySelector('#formElem')
const $imagenFoto = document.querySelector('#img-foto')
const $fondoActivado = document.querySelector('#activo')
const $loading = document.querySelector('#loading')
let formData = new FormData()


$inputImagen.addEventListener('change', async (event) => {

   $fondoActivado.style.display = 'block';
   $loading.style.display = 'block';

   const id_usuario = sessionStorage.getItem('id-usuario')

   let estado;
   
   fetch(`${window.location.origin}/api/uploads/usuarios/${id_usuario}`, {
      method: 'PUT',
      body: new FormData($formElem)      
   })
   .then( resp => {
      
      estado = resp.ok      
      return resp.json()
   })
   .then(data => {

      if(!estado) {
         console.log(data.msg)
      }

      console.log(data.msg)
      $imagenFoto.src = data.modelo.img
      $fondoActivado.style.display = 'none';
      $loading.style.display = 'none';
   })
})