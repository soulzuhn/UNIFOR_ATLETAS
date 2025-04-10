const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rhyan2006@',
  database: 'frequencia_unifor'
});

// Login (sem senha criptografada)
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

module.exports = router;
