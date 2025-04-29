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

  const response = await fetch('https://unifor-atletas.onrender.com/api/cadastrar-treinador', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuarioLogado, novoUsuario, email, senha })
  });

  const result = await response.text();

  if (response.ok) {
    alert("Treinador cadastrado com sucesso!");
    document.getElementById('cadastro-form').reset();
    carregarTreinadores();
  } else {
    alert(result);
  }
});


async function carregarTreinadores() {
  const res = await fetch('https://unifor-atletas.onrender.com/api/treinadores');
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
  if (confirm("Tem certeza que deseja remover este treinador?")) {
    const res = await fetch(`https://unifor-atletas.onrender.com/api/remover-treinador/${id}`, {
      method: 'DELETE'
    });
    const result = await res.text();
    alert(result);
    carregarTreinadores();
  }
}

function editarTreinador(id, nomeAtual, emailAtual) {
  const novoNome = prompt("Novo nome:", nomeAtual);
  const novoEmail = prompt("Novo e-mail:", emailAtual);

  if (novoNome && novoEmail) {
    fetch(`https://unifor-atletas.onrender.com/api/editar-treinador/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novoNome, email: novoEmail })
    })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      carregarTreinadores();
    });
  }
}

carregarTreinadores();
