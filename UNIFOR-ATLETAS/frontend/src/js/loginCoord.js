import { showModalAlert } from './modal.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap';

document.getElementById("admin-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });

    const data = await response.json();

    if (response.ok && data.tipo === "coordenadora") {
      localStorage.setItem("usuario", data.nome);
      localStorage.setItem("tipo", data.tipo);
      showModalAlert("Alerta", "Login realizado com sucesso!");
      window.location.href = "painelAdmin.html";
    } else {
      showModalAlert("Alerta", "Acesso negado. Apenas coordenadora.");
    }
  } catch (err) {
    showModalAlert("Alerta", "Erro no login.");
    console.error(err);
  }
});
