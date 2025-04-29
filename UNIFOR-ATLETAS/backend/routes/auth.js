const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['coordenadora', 'treinador'], default: 'treinador' },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);


router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const user = await Usuario.findOne({ usuario });

    if (!user) return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
    if (senha !== user.senha) return res.status(401).json({ mensagem: 'Senha incorreta.' });

    res.status(200).json({ mensagem: 'Login bem-sucedido.', nome: user.usuario, tipo: user.tipo });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});


router.post('/cadastrar', async (req, res) => {
  const { usuario, email, senha } = req.body;

  if (!usuario || !email || !senha) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos.' });
  }

  try {
    const novoUsuario = new Usuario({ usuario, email, senha });
    await novoUsuario.save();
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    if (err.code === 11000) {
      res.status(400).json({ mensagem: 'Usuário já existente.' });
    } else {
      res.status(500).json({ mensagem: 'Erro no servidor.' });
    }
  }
});


router.post('/cadastrar-treinador', async (req, res) => {
  const { usuarioLogado, novoUsuario, email, senha } = req.body;

  try {
    const usuarioAtual = await Usuario.findOne({ usuario: usuarioLogado });

    if (!usuarioAtual || usuarioAtual.tipo !== 'coordenadora') {
      return res.status(403).json({ mensagem: 'Apenas a coordenadora pode cadastrar treinadores.' });
    }

    const treinador = new Usuario({ usuario: novoUsuario, email, senha, tipo: 'treinador' });
    await treinador.save();
    res.status(201).json({ mensagem: 'Treinador cadastrado com sucesso.' });
  } catch (err) {
    console.error('Erro ao cadastrar treinador:', err);
    res.status(500).json({ mensagem: 'Erro ao cadastrar treinador.' });
  }
});


router.get('/treinadores', async (req, res) => {
  try {
    const treinadores = await Usuario.find({ tipo: 'treinador' }, '_id usuario email'); 
    res.status(200).json(treinadores);
  } catch (err) {
    console.error('Erro ao buscar treinadores:', err);
    res.status(500).json({ mensagem: 'Erro no servidor.' });
  }
});



router.delete('/remover-treinador/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Usuario.deleteOne({ _id: id, tipo: 'treinador' });

    if (result.deletedCount === 0) {
      return res.status(404).json({ mensagem: 'Treinador não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Treinador removido com sucesso.' });
  } catch (err) {
    console.error('Erro ao remover treinador:', err);
    res.status(500).json({ mensagem: 'Erro ao remover treinador.' });
  }
});


router.put('/editar-treinador/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ mensagem: 'Nome e email são obrigatórios.' });
  }

  try {
    const result = await Usuario.updateOne(
      { _id: id, tipo: 'treinador' },
      { $set: { usuario: nome, email } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ mensagem: 'Treinador não encontrado ou dados iguais.' });
    }

    res.status(200).json({ mensagem: 'Treinador atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao editar treinador:', err);
    res.status(500).json({ mensagem: 'Erro ao editar treinador.' });
  }
});

module.exports = router;
