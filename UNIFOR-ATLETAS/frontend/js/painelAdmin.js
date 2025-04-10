document.getElementById("nome").textContent = localStorage.getItem("usuario");

    function logout() {
      localStorage.clear();
      window.location.href = "adminLogin.html";
    }

    document.getElementById('cadastro-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const usuarioLogado = localStorage.getItem('usuario');
      const novoUsuario = document.getElementById('novoUsuario').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      const response = await fetch('http://localhost:3000/api/cadastrar-treinador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioLogado, novoUsuario, email, senha })
      });

      const result = await response.text();
       
      if (localStorage.getItem('tipo') !== 'coordenadora') {
        alert("Acesso negado.");
        window.location.href = "adminLogin.html";
      }
      
      if (response.ok) {
        alert("Treinador cadastrado com sucesso!");
        document.getElementById('cadastro-form').reset();
      } else {
        alert(result);
      }

    });