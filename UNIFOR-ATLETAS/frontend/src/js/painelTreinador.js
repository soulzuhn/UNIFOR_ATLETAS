import { showModalAlert, showModalConfirm } from "./modal.js";

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
    listaAlunos.innerHTML = '<h4 style="margin-top: 0; color: #142191;">Nome dos Alunos</h4>';

    alunos.forEach((aluno, i) => {
      const div = document.createElement("div");
      div.className = "aluno-card";
      div.innerHTML = `
        <span>${escapeHTML(aluno.nome)}</span>
        <span>
          <input type="radio" name="aluno${i}" value="presente"> Presente
          <input type="radio" name="aluno${i}" value="ausente"> Ausente
        </span>
        <span>
          <button class="btn-editar" data-id="${aluno._id}" data-nome="${escapeHTML(aluno.nome)}">Editar</button>
          <button class="btn-remover" data-id="${aluno._id}" data-nome="${escapeHTML(aluno.nome)}">Remover</button>
        </span>
      `;
      listaAlunos.appendChild(div);
    });

    document.querySelectorAll(".btn-editar").forEach(btn =>
      btn.addEventListener("click", () =>
        editarAluno(btn.dataset.id, btn.dataset.nome)
      )
    );

    document.querySelectorAll(".btn-remover").forEach(btn =>
      btn.addEventListener("click", () =>
        removerAluno(btn.dataset.id, btn.dataset.nome)
      )
    );

    carregarHistorico();
  } catch (error) {
    console.error("Erro ao carregar alunos:", error);
    showModalAlert("Erro", "Erro ao carregar lista de alunos.");
  }
}

async function adicionarAluno() {
  const nome = document.getElementById("novoAlunoNome").value.trim();
  if (!nome || !turma)
    return showModalAlert("Atenção", "Nome e turma são obrigatórios.");

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

async function editarAluno(id, nomeAtual) {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Aluno</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" id="inputNovoNome" value="${escapeHTML(nomeAtual)}" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="confirmarEdicao">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const { Modal } = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
  const modal = new Modal(document.getElementById("editModal"));
  modal.show();

  document.getElementById("confirmarEdicao").addEventListener("click", async () => {
    const novoNome = document.getElementById("inputNovoNome").value.trim();
    if (!novoNome) return showModalAlert("Erro", "O nome não pode ser vazio.");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aluno/editar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome }),
      });

      const result = await response.json();
      modal.hide();

      if (response.ok) {
        showModalAlert("Sucesso", result.message);
        carregarAlunosDaTurma();
      } else {
        showModalAlert("Erro", result.error);
      }
    } catch (error) {
      modal.hide();
      showModalAlert("Erro", "Erro ao editar aluno.");
    }
  });
}

async function removerAluno(id, nomeAluno) {
  const confirmar = await showModalConfirm(
    "Remover Aluno",
    `Tem certeza que deseja remover o aluno <strong>${escapeHTML(nomeAluno)}</strong>?`
  );
  if (!confirmar) return;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aluno/remover/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    if (response.ok) {
      showModalAlert("Sucesso", result.message);
      carregarAlunosDaTurma();
    } else {
      showModalAlert("Erro", result.error);
    }
  } catch (error) {
    showModalAlert("Erro", "Erro ao remover aluno.");
  }
}

async function salvarPresencas() {
  const data = document.getElementById("dataSelecionada").value;
  if (!data) return showModalAlert("Atenção", "Selecione uma data!");

  const registros = {};
  alunos.forEach((aluno, i) => {
    const presenca = document.querySelector(`input[name=aluno${i}]:checked`);
    registros[aluno.nome] = presenca ? presenca.value : null;
  });

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/presenca/registrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ turma, data, registros }),
    });

    const result = await response.json();
    showModalAlert("Informação", result.message || "Presenças salvas!");
    carregarHistorico();
  } catch (error) {
    showModalAlert("Erro", "Erro ao salvar presença.");
  }
}

async function editarPresenca(nomeAluno, dataOriginal, statusAtual) {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    <div class="modal fade" id="editPresencaModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Presença</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p><strong>${escapeHTML(nomeAluno)}</strong> em ${formatarData(dataOriginal)}</p>
            <select id="novaPresenca" class="form-control">
              <option value="presente" ${statusAtual === "presente" ? "selected" : ""}>Presente</option>
              <option value="ausente" ${statusAtual === "ausente" ? "selected" : ""}>Ausente</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="confirmarEdicaoPresenca">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const { Modal } = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
  const modal = new Modal(document.getElementById("editPresencaModal"));
  modal.show();

  document.getElementById("confirmarEdicaoPresenca").addEventListener("click", async () => {
    const novaPresenca = document.getElementById("novaPresenca").value;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/presenca/editar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ turma, data: dataOriginal, nomeAluno, novaPresenca }),
      });

      const result = await response.json();
      modal.hide();

      if (response.ok) {
        showModalAlert("Sucesso", result.message || "Presença atualizada.");
        carregarHistorico();
      } else {
        showModalAlert("Erro", result.error || "Erro ao atualizar presença.");
      }
    } catch (error) {
      modal.hide();
      showModalAlert("Erro", "Erro ao atualizar presença.");
    }
  });
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
      const registros = Object.entries(historico)
        .filter(([_, reg]) => reg[aluno.nome])
        .map(([data, reg]) => ({
          data,
          status: reg[aluno.nome],
        }));

      if (registros.length) {
        container.innerHTML += `
          <details>
            <summary>${escapeHTML(aluno.nome)}</summary>
            ${registros.map(({ data, status }) => `
              <p>
                ${formatarData(data)} - <strong>${status}</strong>
                <button class="btn btn-sm btn-outline-primary" onclick="editarPresenca('${aluno.nome}', '${data}', '${status}')">Editar</button>
              </p>
            `).join("")}
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

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", carregarAlunosDaTurma);
window.adicionarAluno = adicionarAluno;
window.salvarPresencas = salvarPresencas;
window.logout = logout;
window.carregarHistorico = carregarHistorico;
window.editarAluno = editarAluno;
window.removerAluno = removerAluno;
window.editarPresenca = editarPresenca;
