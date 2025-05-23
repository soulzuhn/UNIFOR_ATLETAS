const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/buscar', alunoController.buscarAlunosPorTurma);
router.post('/cadastrar', alunoController.cadastrarAluno); 

module.exports = router;
