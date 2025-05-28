import"./main-R5KTlRTc.js";document.addEventListener("DOMContentLoaded",async()=>{const a=localStorage.getItem("turmaSelecionada");document.getElementById("nomeTurma").textContent=a;try{const i=await(await fetch(`https://unifor-atletas.onrender.com/api/presenca/historico?turma=${encodeURIComponent(a)}`)).json(),s=document.querySelector("#tabela-frequencia tbody");s.innerHTML="";let e=0,t=0,n=0;Object.entries(i).forEach(([u,m])=>{Object.entries(m).forEach(([g,o])=>{e++,o.toLowerCase()==="presente"?t++:o.toLowerCase()==="ausente"&&n++;const c=document.createElement("tr");c.innerHTML=`
          <td>${new Date(u).toLocaleDateString("pt-BR")}</td>
          <td>${g}</td>
          <td>${o}</td>
        `,s.appendChild(c)})});const d=(t/e*100).toFixed(1),l=(n/e*100).toFixed(1),p=document.getElementById("estatisticas");p.innerHTML=`
      <p><strong>Total de registros:</strong> ${e}</p>
      <p><strong>Presenças:</strong> ${t} (${d}%)</p>
      <p><strong>Ausências:</strong> ${n} (${l}%)</p>
    `}catch(r){console.error("Erro ao carregar frequência:",r),alert("Erro ao buscar dados de frequência.")}});
