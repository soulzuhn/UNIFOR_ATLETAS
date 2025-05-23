import { showModalAlert } from "./modal.js";

let alunos = [];
const nome = localStorage.getItem("nome");
const turma = localStorage.getItem("turmaSelecionada");

if (nome) document.getElementById("nomeTreinador").textContent = nome;
if (turma) document.getElementById("turmaSelecionada").textContent = turma;

async function carregarAlunosDaTurma() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/aluno/buscar?turma=${encodeURIComponent(turma)}`
    );
    alunos = await response.json();
    const listaAlunos = document.getElementById("lista-alunos");
    listaAlunos.innerHTML =
      '<h4 style="margin-top: 0; color: #142191;">Nome dos Alunos</h4>';

    alunos.forEach((aluno, i) => {
      listaAlunos.innerHTML += `
         <div class="aluno-card">
         <span>${aluno.nome}</span>
         <span>
          <input type="radio" name="aluno${i}" value="presente">  Presente
          <input type="radio" name="aluno${i}" value="ausente">  Ausente
         </span>
       </div>`;
    });

    carregarHistorico();
  } catch (error) {
    console.error("Erro ao carregar alunos:", error);
    showModalAlert("Erro", "Erro ao carregar lista de alunos.");
  }
}

async function adicionarAluno() {
  const nome = document.getElementById("novoAlunoNome").value.trim();
  if (!nome || !turma) return showModalAlert("Atenção", "Nome e turma são obrigatórios.");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aluno/cadastrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, turma }),
    });

    const result = await response.json();
    if (response.ok) {
      showModalAlert("Sucesso", "Aluno adicionado com sucesso!");
      document.getElementById("novoAlunoNome").value = "";
      carregarAlunosDaTurma();
    } else {
      showModalAlert("Erro", result.error || "Erro ao adicionar aluno.");
    }
  } catch (error) {
    showModalAlert("Erro", "Erro ao adicionar aluno.");
  }
}

async function salvarPresencas() {
  const data = document.getElementById("dataSelecionada").value;
  if (!data) return showModalAlert("Atenção", "Selecione uma data!");

  const registros = {};
  alunos.forEach((aluno, i) => {
    const presenca = document.querySelector(
      `input[name=aluno${i}]:checked`
    );
    registros[aluno.nome] = presenca ? presenca.value : null;
  });

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/presenca/registrar`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ turma, data, registros }),
      }
    );

    const result = await response.json();
    showModalAlert("Informação", result.message || "Presenças salvas!");
    carregarHistorico();
  } catch (error) {
    showModalAlert("Erro", "Erro ao salvar presença.");
    console.error(error);
  }
}

async function carregarHistorico() {
  const container = document.getElementById("historico");
  container.innerHTML = "";

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/presenca/historico?turma=${encodeURIComponent(turma)}`
    );
    const historico = await response.json();

    if (!historico || Object.keys(historico).length === 0) {
      container.innerHTML = "<p>Nenhum histórico encontrado.</p>";
      return;
    }

    alunos.forEach((aluno) => {
      const presencas = [];
      const ausencias = [];

      for (const [dia, registros] of Object.entries(historico)) {
        if (registros[aluno.nome] === "presente")
          presencas.push(formatarData(dia));
        else if (registros[aluno.nome] === "ausente")
          ausencias.push(formatarData(dia));
      }

      if (presencas.length || ausencias.length) {
        container.innerHTML += `
        <details>
          <summary>${aluno.nome}</summary>
          <p><strong>Dias Presente:</strong> ${
            presencas.join(", ") || "Nenhum"
          }</p>
          <p><strong>Dias Ausente:</strong> ${
            ausencias.join(", ") || "Nenhum"
          }</p>
        </details>`;
      }
    });
  } catch (err) {
    container.innerHTML = "<p>Erro ao carregar histórico.</p>";
  }
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function logout() {
  localStorage.clear();
  window.location.href = "loginTrein.html";
}

document.addEventListener("DOMContentLoaded", carregarAlunosDaTurma);
window.adicionarAluno = adicionarAluno;
window.salvarPresencas = salvarPresencas;
window.logout = logout;
window.carregarHistorico = carregarHistorico;
