const { Router } = require('express');
const { getImage } = require('../controllers/imageController');

const router = Router();

router.get('/:ejercicio', getImage);

module.exports = router;
