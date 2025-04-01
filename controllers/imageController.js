const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const getImage = async (req, res) => {
    try {
        const { ejercicio } = req.params;
        
        // Construir el public_id basado en el nombre del ejercicio
        const public_id = `ejercicios/${ejercicio}`;
        
        // Obtener la URL de la imagen
        const result = await cloudinary.url(public_id, {
            secure: true
        });

        res.json({
            ok: true,
            imageUrl: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener la imagen'
        });
    }
};

module.exports = {
    getImage
};
