const mongoose = require('mongoose');

const PresencaSchema = new mongoose.Schema({
  aluno: String,
  data: String, 
  status: String, 
  turma: String,
}, { timestamps: true });

module.exports = mongoose.model('Presenca', PresencaSchema);
