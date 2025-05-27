const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.login = async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const user = await Usuario.findOne({ usuario });

    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: user._id, tipo: user.tipo, nome: user.usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      mensagem: 'Login bem-sucedido.',
      nome: user.usuario,
      tipo: user.tipo,
      token
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};


exports.cadastrar = async (req, res) => {
  const { usuario, email, senha } = req.body;

  if (!usuario || !email || !senha) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    const novoUsuario = new Usuario({
      usuario,
      email,
      senha: hashedPassword,
      tipo: 'coordenadora'
    });

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
};


exports.cadastrarTreinador = async (req, res) => {
  const { novoUsuario, email, senha } = req.body;

  try {
    if (!req.user || req.user.tipo !== 'coordenadora') {
      return res.status(403).json({ mensagem: 'Apenas a coordenadora pode cadastrar treinadores.' });
    }

    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    const treinador = new Usuario({
      usuario: novoUsuario,
      email,
      senha: hashedPassword,
      tipo: 'treinador'
    });

    await treinador.save();
    res.status(201).json({ mensagem: 'Treinador cadastrado com sucesso.' });
  } catch (err) {
    console.error('Erro ao cadastrar treinador:', err);
    res.status(500).json({ mensagem: 'Erro ao cadastrar treinador.' });
  }
};


exports.listarTreinadores = async (req, res) => {
  try {
    const treinadores = await Usuario.find({ tipo: 'treinador' }, '_id usuario email');
    res.status(200).json(treinadores);
  } catch (err) {
    console.error('Erro ao buscar treinadores:', err);
    res.status(500).json({ mensagem: 'Erro no servidor.' });
  }
};


exports.removerTreinador = async (req, res) => {
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
};


exports.editarTreinador = async (req, res) => {
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
};
