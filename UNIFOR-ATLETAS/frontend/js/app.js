
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = document.getElementById('username').value;
  const senha = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, senha }),
    })

    const data = await response.json()

    if (response.ok) {
      alert('Login realizado com sucesso!')
    } else {
      alert(data)
    }
  } catch (err) {
    alert('Erro usuario ou senha incorretos.');
  }
});
