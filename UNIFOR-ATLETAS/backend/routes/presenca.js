const express = require('express');
const router = express.Router();
const presencaController = require('../controllers/presencaController');

router.post('/registrar', presencaController.registrarPresenca);
router.get('/historico', presencaController.buscarPresencas);

module.exports = router;
