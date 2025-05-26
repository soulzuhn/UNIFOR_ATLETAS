const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require("../middlewares/auth");


router.post('/login', usuarioController.login);


router.post('/cadastrar', usuarioController.cadastrar);


router.post('/cadastrar-treinador', auth, usuarioController.cadastrarTreinador);


router.get('/treinadores', auth, usuarioController.listarTreinadores);


router.delete('/remover-treinador/:id', auth, usuarioController.removerTreinador);


router.put('/editar-treinador/:id', auth, usuarioController.editarTreinador);

module.exports = router;
