const express = require('express');
const router = express.Router();
const presencaController = require('../controllers/presencaController');

router.post('/registrar', presencaController.registrarPresenca);
router.get('/historico', presencaController.buscarPresencas);
router.put('/editar', presencaController.editarPresencaPorCampos);



module.exports = router;
