import { showModalAlert, showModalConfirm } from './modal.js';
import { Modal } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap';

document.getElementById("nome").textContent = localStorage.getItem("usuario");

function logout() {
  localStorage.clear();
  window.location.href = "loginCoord.html";
}
window.logout = logout;

// CADASTRAR TREINADOR
document.getElementById('cadastro-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  const usuarioLogado = localStorage.getItem('usuario');
  const novoUsuario = document.getElementById('novoUsuario').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/cadastrar-treinador`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ usuarioLogado, novoUsuario, email, senha })
  });

  const result = await response.json();

  if (response.ok) {
    showModalAlert('Alerta', "Treinador cadastrado com sucesso!");
    document.getElementById('cadastro-form').reset();
    carregarTreinadores();
  } else {
    showModalAlert('Alerta', result.mensagem || 'Erro ao cadastrar.');
  }
});

// LISTAR TREINADORES
async function carregarTreinadores() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/treinadores`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const treinadores = await res.json();
  const lista = document.getElementById('lista-treinadores');

  lista.innerHTML = '';

  treinadores.forEach(treinador => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${treinador.usuario}</strong> - ${treinador.email}
      <button onclick="editarTreinador('${treinador._id}', '${treinador.usuario}', '${treinador.email}')">Editar</button>
      <button onclick="removerTreinador('${treinador._id}')">Remover</button>
    `;
    lista.appendChild(li);
  });
}

// REMOVER TREINADOR
async function removerTreinador(id) {
  const confirmado = await showModalConfirm("Confirmação", "Tem certeza que deseja remover este treinador?");
  if (confirmado) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/remover-treinador/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await res.json();
    showModalAlert('Alerta', result.mensagem);
    carregarTreinadores();
  }
}

// EDITAR TREINADOR
let editModal;
const editTreinadorIdInput = document.getElementById("editTreinadorId");
const editNomeInput = document.getElementById("editNome");
const editEmailInput = document.getElementById("editEmail");

function editarTreinador(id, nomeAtual, emailAtual) {
  editTreinadorIdInput.value = id;
  editNomeInput.value = nomeAtual;
  editEmailInput.value = emailAtual;

  const modalElement = document.getElementById('editTrainerModal');
  editModal = new Modal(modalElement);
  editModal.show();
}

document.getElementById("editTrainerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = editTreinadorIdInput.value;
  const nome = editNomeInput.value;
  const email = editEmailInput.value;
  const token = localStorage.getItem('token');

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/editar-treinador/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nome, email })
  });

  const result = await response.json();
  showModalAlert('Alerta', result.mensagem);
  editModal.hide();
  carregarTreinadores();
});

// Inicializa
carregarTreinadores();

// Torna funções acessíveis no HTML
window.editarTreinador = editarTreinador;
window.removerTreinador = removerTreinador;
