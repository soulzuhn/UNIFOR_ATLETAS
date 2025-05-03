import { showModalAlert } from './modal.js';
document.getElementById("admin-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha })
      });
      

      const data = await response.json();

      if (response.ok && data.tipo === 'coordenadora') {
        localStorage.setItem('usuario', data.nome);
        localStorage.setItem('tipo', data.tipo);
        showModalAlert('Alerta', "Login realizado com sucesso!");
        window.location.href = "painelAdmin.html";
      } else {
        showModalAlert('Alerta', "Acesso negado. Apenas coordenadora.");
      }

    } catch (err) {
      showModalAlert('Alerta', "Erro no login.");
      console.error(err);
    }
  });