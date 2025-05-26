document.addEventListener("DOMContentLoaded", async () => {
  const turmas = ["Infantil", "Sub-18", "Sub-20/23", "Adulto"];
  const presencaPorTurma = {};

  for (const turma of turmas) {
    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/api/presenca/historico?turma=${encodeURIComponent(turma)}`);
      const dados = await resposta.json();

      let totalPresencas = 0;
      let totalAusencias = 0;

      Object.values(dados).forEach(alunos => {
        Object.values(alunos).forEach(status => {
          if (status.toLowerCase() === "presente") totalPresencas++;
          else totalAusencias++;
        });
      });

      presencaPorTurma[turma] = {
        presentes: totalPresencas,
        ausentes: totalAusencias,
      };

    } catch (erro) {
      console.error(`Erro ao buscar presença da turma ${turma}:`, erro);
    }
  }


  const ctx = document.getElementById('graficoPresencaGeral').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: turmas,
      datasets: [
        {
          label: 'Presenças',
          data: turmas.map(t => presencaPorTurma[t]?.presentes || 0),
          backgroundColor: 'rgba(54, 162, 235, 0.7)'
        },
        {
          label: 'Ausências',
          data: turmas.map(t => presencaPorTurma[t]?.ausentes || 0),
          backgroundColor: 'rgba(255, 99, 132, 0.7)'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
