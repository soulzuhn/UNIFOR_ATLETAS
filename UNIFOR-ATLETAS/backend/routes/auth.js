const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rhyan2006@',
  database: 'frequencia_unifor'
});


router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  const query = 'SELECT * FROM usuarios WHERE usuario = ?';

  db.query(query, [usuario], (err, results) => {
    if (err) return res.status(500).send('Erro interno no servidor');
    if (results.length === 0) return res.status(401).send('Usuário não encontrado');

    const user = results[0];

    if (senha !== user.senha) {
      return res.status(401).send('Senha incorreta');
    }

    res.status(200).json({ mensagem: 'Login bem-sucedido', nome: user.usuario, tipo: user.tipo });
  });
});


router.post('/cadastrar', (req, res) => {
  const { usuario, email, senha } = req.body;
  if (!usuario || !email || !senha) {
    return res.status(400).send("Preencha todos os campos.");
  }
  const sql = "INSERT INTO usuarios (usuario, email, senha, tipo) VALUES (?, ?, ?, 'treinador')";
  db.query(sql, [usuario, email, senha], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar:", err);
      return res.status(500).send("Erro no servidor.");
    }
    res.status(200).send("Usuário cadastrado com sucesso.");
  });
});


router.post('/cadastrar-treinador', (req, res) => {
  const { usuarioLogado, novoUsuario, email, senha } = req.body;

  const query = "SELECT * FROM usuarios WHERE usuario = ?";
  db.query(query, [usuarioLogado], (err, results) => {
    if (err || results.length === 0) return res.status(403).send("Usuário não autorizado");

    const usuarioAtual = results[0];
    if (usuarioAtual.tipo !== 'coordenadora') {
      return res.status(403).send("Apenas a coordenadora pode cadastrar treinadores.");
    }

    const insertQuery = "INSERT INTO usuarios (usuario, email, senha, tipo) VALUES (?, ?, ?, 'treinador')";
    db.query(insertQuery, [novoUsuario, email, senha], (err2, result) => {
      if (err2) {
        console.error("Erro ao cadastrar treinador:", err2);
        return res.status(500).send("Erro ao cadastrar treinador.");
      }
      res.status(201).send("Treinador cadastrado com sucesso.");
    });
  });
});


router.get('/treinadores', (req, res) => {
  const sql = "SELECT id, usuario AS nome, email FROM usuarios WHERE tipo = 'treinador'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar treinadores:", err);
      return res.status(500).send("Erro no servidor.");
    }
    res.status(200).json(results);
  });
});


router.delete('/remover-treinador/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuarios WHERE id = ? AND tipo = 'treinador'";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao remover treinador:", err);
      return res.status(500).send("Erro ao remover treinador.");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Treinador não encontrado.");
    }
    res.status(200).send("Treinador removido com sucesso.");
  });
});


router.put('/editar-treinador/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).send("Nome e email são obrigatórios.");
  }

  const sql = "UPDATE usuarios SET usuario = ?, email = ? WHERE id = ? AND tipo = 'treinador'";
  db.query(sql, [nome, email, id], (err, result) => {
    if (err) {
      console.error("Erro ao editar treinador:", err);
      return res.status(500).send("Erro ao editar treinador.");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Treinador não encontrado.");
    }
    res.status(200).send("Treinador atualizado com sucesso.");
  });
});

module.exports = router;
