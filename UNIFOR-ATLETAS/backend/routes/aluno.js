const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/buscar', alunoController.buscarAlunosPorTurma);
router.post('/cadastrar', alunoController.cadastrarAluno); 
router.put('/editar/:id', alunoController.editarAluno);
router.delete('/remover/:id', alunoController.removerAluno);


module.exports = router;
