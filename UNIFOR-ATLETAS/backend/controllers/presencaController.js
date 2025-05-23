const Presenca = require('../models/Presenca');

exports.registrarPresenca = async (req, res) => {
  try {
    const { turma, data, registros } = req.body;

    const presencas = Object.entries(registros).map(([aluno, status]) => ({
      aluno,
      status,
      data,
      turma
    }));

    await Presenca.insertMany(presencas);

    res.status(201).json({ message: 'Presenças salvas com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar presença:', error);
    res.status(500).json({ error: 'Erro interno ao registrar presença.' });
  }
};

exports.buscarPresencas = async (req, res) => {
  try {
    const { turma } = req.query;


    const presencas = await Presenca.find({ turma });

 
    const historicoFormatado = {};

    presencas.forEach(p => {
      const data = p.data;
      const aluno = p.aluno;
      const status = p.status || "não informado";

      if (!historicoFormatado[data]) {
        historicoFormatado[data] = {};
      }

      historicoFormatado[data][aluno] = status;
    });

    console.log("Histórico formatado:", historicoFormatado); // debug

    res.status(200).json(historicoFormatado);
  } catch (error) {
    console.error("Erro ao buscar presenças:", error);
    res.status(500).json({ error: "Erro ao buscar histórico de presenças." });
  }
};
