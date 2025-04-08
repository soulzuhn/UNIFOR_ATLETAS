
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rhyan2006@', 
  database: 'frequencia_unifor'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('API rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Rota de cadastro de usuário
app.post('/cadastrar', (req, res) => {
    const { usuario, email, senha } = req.body;
    if (!usuario || !email || !senha) {
        return res.status(400).send("Preencha todos os campos.");
    }
    const sql = "INSERT INTO usuarios (usuario, email, senha) VALUES (?, ?, ?)";
    db.query(sql, [usuario, email, senha], (err, result) => {
        if (err) {
            console.error("Erro ao cadastrar:", err);
            return res.status(500).send("Erro no servidor.");
        }
        res.status(200).send("Usuário cadastrado com sucesso.");
    });
});

