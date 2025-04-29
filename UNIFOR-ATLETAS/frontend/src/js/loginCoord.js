document.getElementById("admin-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("https://unifor-atletas.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha })
      });

      const data = await response.json();

      if (response.ok && data.tipo === 'coordenadora') {
        localStorage.setItem('usuario', data.nome);
        localStorage.setItem('tipo', data.tipo);
        alert("Login realizado com sucesso!");
        window.location.href = "painelAdmin.html";
      } else {
        alert("Acesso negado. Apenas coordenadora.");
      }

    } catch (err) {
      alert("Erro no login.");
      console.error(err);
    }
  });