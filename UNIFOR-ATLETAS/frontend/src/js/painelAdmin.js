
import { showModalAlert, showModalConfirm } from './modal.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';


document.getElementById("nome").textContent = localStorage.getItem("usuario");

function logout() {
  localStorage.clear();
  window.location.href = "loginCoord.html";
}

document.getElementById('cadastro-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuarioLogado = localStorage.getItem('usuario');
  const novoUsuario = document.getElementById('novoUsuario').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const response = await fetch('http://localhost:3000/api/usuarios/cadastrar-treinador', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuarioLogado, novoUsuario, email, senha })
  });

  const result = await response.text();

  if (response.ok) {
    showModalAlert('Alerta', "Treinador cadastrado com sucesso!");
    document.getElementById('cadastro-form').reset();
    carregarTreinadores();
  } else {
    showModalAlert('Alerta', result);
  }
});


async function carregarTreinadores() {
  const res = await fetch('http://localhost:3000/api/usuarios/treinadores');
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

async function removerTreinador(id) {
  const confirmado = await showModalConfirm("Confirmação", "Tem certeza que deseja remover este treinador?");
  if (confirmado) {
    const res = await fetch(`http://localhost:3000/api/usuarios/remover-treinador/${id}`, {
      method: 'DELETE'
    });
    const result = await res.json();
    showModalAlert('Alerta', result.mensagem);
    carregarTreinadores();
  }
}


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

  const response = await fetch(`http://localhost:3000/api/usuarios/editar-treinador/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email })
  });

  const result = await response.json();
showModalAlert('Alerta', result.mensagem);
  editModal.hide();
  carregarTreinadores();
});

carregarTreinadores();


window.editarTreinador = editarTreinador;
window.removerTreinador = removerTreinador;
window.logout = logout;
