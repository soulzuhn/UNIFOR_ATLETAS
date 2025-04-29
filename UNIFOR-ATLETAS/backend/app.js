const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB!'))
.catch((err) => console.error(' Erro ao conectar no MongoDB:', err));


app.use('/api', authRoutes);


app.get('/', (req, res) => {
  res.send('🚀 API rodando!');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
