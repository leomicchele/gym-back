const { Client } = require('@notionhq/client');

// Inicializar cliente de Notion con la API Key
const notion = new Client({
  auth: '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'
});

// ID de la base de datos de Notion
const databaseId = '1bbe622e780180b9ad5fccc0044b52dc';

// Controlador para enviar datos de formulario a Notion
const enviarFormularioNotion = async (req, res) => {
  const { nombre, telefono, mail, tipoGimnasio, comentario } = req.body;

  // Validación básica de datos
  if (!nombre || !telefono || !mail) {
    return res.status(400).json({
      msg: 'Los campos nombre, teléfono y mail son obligatorios'
    });
  }

  try {
    // Crear una nueva entrada en la base de datos de Notion
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Nombre: {
          title: [
            {
              text: {
                content: nombre
              }
            }
          ]
        },
        Teléfono: {
          phone_number: telefono
        },
        Email: {
          email: mail
        },
        "Tipo de Gimnasio": {
          rich_text: [
            {
              text: {
                content: tipoGimnasio || ""
              }
            }
          ]
        },
        Comentarios: {
          rich_text: [
            {
              text: {
                content: comentario || ""
              }
            }
          ]
        }
        
      }
    });

    res.status(201).json({
      msg: 'Formulario enviado exitosamente a Notion',
      data: response
    });
  } catch (error) {
    console.error('Error al enviar datos a Notion:', error);
    res.status(500).json({
      msg: 'Error al procesar el formulario',
      error: error.message
    });
  }
};

module.exports = {
  enviarFormularioNotion
}; 