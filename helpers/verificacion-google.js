const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID_CLIENTE);

async function verificacionGoogle(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID_CLIENTE
  });

  const payload = ticket.getPayload();

  return {
     nombre: payload.given_name,
     apellido: payload.family_name,
     email: payload.email,
     img: payload.picture
  }
};


module.exports = verificacionGoogle