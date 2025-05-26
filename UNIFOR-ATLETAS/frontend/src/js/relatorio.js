document.addEventListener("DOMContentLoaded", async () => {
  const nomeTurma = localStorage.getItem('turmaSelecionada');
  document.getElementById('nomeTurma').textContent = nomeTurma;

  try {
    const resposta = await fetch(`${import.meta.env.VITE_API_URL}/api/presenca/historico?turma=${encodeURIComponent(nomeTurma)}`);
    const dados = await resposta.json();

    const tabela = document.querySelector("#tabela-frequencia tbody");
    tabela.innerHTML = "";

    let total = 0;
    let presencas = 0;
    let ausencias = 0;

    Object.entries(dados).forEach(([data, alunos]) => {
      Object.entries(alunos).forEach(([aluno, status]) => {
        total++;
        if (status.toLowerCase() === "presente") presencas++;
        else if (status.toLowerCase() === "ausente") ausencias++;

        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${new Date(data).toLocaleDateString('pt-BR')}</td>
          <td>${aluno}</td>
          <td>${status}</td>
        `;
        tabela.appendChild(linha);
      });
    });

    const percentualPresenca = ((presencas / total) * 100).toFixed(1);
    const percentualAusencia = ((ausencias / total) * 100).toFixed(1);

    const estatisticasDiv = document.getElementById("estatisticas");
    estatisticasDiv.innerHTML = `
      <p><strong>Total de registros:</strong> ${total}</p>
      <p><strong>Presenças:</strong> ${presencas} (${percentualPresenca}%)</p>
      <p><strong>Ausências:</strong> ${ausencias} (${percentualAusencia}%)</p>
    `;

  } catch (erro) {
    console.error("Erro ao carregar frequência:", erro);
    alert("Erro ao buscar dados de frequência.");
  }
});
