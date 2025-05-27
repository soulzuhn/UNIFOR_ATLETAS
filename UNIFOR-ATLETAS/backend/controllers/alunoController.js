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

exports.editarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) return res.status(400).json({ error: "Nome é obrigatório." });

    const alunoAtualizado = await Aluno.findByIdAndUpdate(id, { nome }, { new: true });

    if (!alunoAtualizado) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    res.status(200).json({ message: "Aluno atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao editar aluno:", error);
    res.status(500).json({ error: "Erro ao editar aluno." });
  }
};


exports.removerAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const alunoRemovido = await Aluno.findByIdAndDelete(id);

    if (!alunoRemovido) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    res.status(200).json({ message: "Aluno removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover aluno:", error);
    res.status(500).json({ error: "Erro ao remover aluno." });
  }
};

