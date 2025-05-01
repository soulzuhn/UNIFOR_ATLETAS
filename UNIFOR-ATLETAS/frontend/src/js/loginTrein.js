
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = document.getElementById('username').value;
  const senha = document.getElementById('password').value;

  try {
    const response = await fetch('https://unifor-atletas.onrender.com/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, senha }),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('usuario', data.nome);
      localStorage.setItem('tipo', data.tipo);
    
      if (data.tipo === 'treinador') {
        window.location.href = 'painelTreinador.html'; 
      } else {
        alert('Apenas treinadores acessam este login.');
      }
    }
    
  } catch (err) {
    alert('Erro usuario ou senha incorretos.');
  }
});
