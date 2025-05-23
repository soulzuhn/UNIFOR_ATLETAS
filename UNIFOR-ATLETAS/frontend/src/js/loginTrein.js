import { showModalAlert } from './modal.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap';
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = document.getElementById('username').value;
  const senha = document.getElementById('password').value;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/login`, {
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
        window.location.href = 'turmas.html';
      } else {
        showModalAlert('Alerta', 'Apenas treinadores acessam este login.');
      }
    } else {
      showModalAlert('Alerta', data.message || 'Usuário ou senha incorretos.');
    }

  } catch (err) {
    console.error(err);
    showModalAlert('Erro', 'Erro de rede ou servidor indisponível.');
  }
});

