import { showModalAlert } from './modal.js';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = document.getElementById('username').value;
  const senha = document.getElementById('password').value;

  try {
    const response = await fetch("http://localhost:3000/api/usuarios/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('usuario', data.nome);
      localStorage.setItem('tipo', data.tipo);

      if (data.tipo === 'treinador') {
        window.location.href = 'painelTreinador.html';
      } else {
        showModalAlert('Alerta', 'Apenas treinadores acessam este login.');
      }
    } else {
      // Mostra erro se usuário/senha estiverem incorretos
      showModalAlert('Alerta', data.message || 'Usuário ou senha incorretos.');
    }

  } catch (err) {
    // Só cai aqui se for erro de rede ou erro inesperado
    console.error(err);
    showModalAlert('Erro', 'Erro de rede ou servidor indisponível.');
  }
});

