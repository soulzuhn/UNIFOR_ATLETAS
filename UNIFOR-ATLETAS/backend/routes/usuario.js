const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');


router.post('/login', usuarioController.login);


router.post('/cadastrar', usuarioController.cadastrar);


router.post('/cadastrar-treinador', usuarioController.cadastrarTreinador);


router.get('/treinadores', usuarioController.listarTreinadores);


router.delete('/remover-treinador/:id', usuarioController.removerTreinador);


router.put('/editar-treinador/:id', usuarioController.editarTreinador);

module.exports = router;
