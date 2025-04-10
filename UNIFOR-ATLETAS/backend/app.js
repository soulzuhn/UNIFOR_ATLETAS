
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


