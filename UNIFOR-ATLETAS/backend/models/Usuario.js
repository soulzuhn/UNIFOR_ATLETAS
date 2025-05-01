const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  tipo: {
    type: String,
    enum: ['coordenadora', 'treinador'],
    default: 'treinador'
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
