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

    res.status(200).json({ mensagem: 'Login bem-sucedido', nome: user.nome });
  });
});

module.exports = router;
