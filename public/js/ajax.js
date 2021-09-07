
// Envia los datos del usuario logiado
async function peticionLoginRegistro(usuario, url) {
  let urlPost = url;
  let estado;

  return fetch(urlPost, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((res) => {
      estado = res.status;
      return res.json();
    })
    .then((respuesta) => {
      return { respuesta, estado };
    })
    .catch((err) => console.log(err));
};


async function peticionRedireccionamiento (token, id) {
  setTimeout(() => {
    
    window.location = `${window.location}home/${id}`
    
  }, 1000);

  // fetch(`home/${id}`, {
  //   method: "GET",
  //   headers: {
  //     "x-token": token
  //   }
  // })
}

export { peticionLoginRegistro,
  peticionRedireccionamiento}