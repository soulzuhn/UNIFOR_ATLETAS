const Aluno = require('../models/Aluno');


exports.buscarAlunosPorTurma = async (req, res) => {
  try {
    const { turma } = req.query;
    const alunos = await Aluno.find({ turma });
    res.status(200).json(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Erro ao buscar alunos." });
  }
};


exports.cadastrarAluno = async (req, res) => {
  try {
    const { nome, turma } = req.body;

    if (!nome || !turma) {
      return res.status(400).json({ error: "Nome e turma são obrigatórios." });
    }

    const novoAluno = new Aluno({ nome, turma });
    await novoAluno.save();

    res.status(201).json({ message: "Aluno adicionado com sucesso." });
  } catch (error) {
    console.error("Erro ao adicionar aluno:", error);
    res.status(500).json({ error: "Erro ao adicionar aluno." });
  }
};
