const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-R5KTlRTc.js","assets/main-CIOEm7KW.css"])))=>i.map(i=>d[i]);
import"./main-R5KTlRTc.js";import{s as i,a as I}from"./modal-CQ86hjxP.js";const L="modulepreload",C=function(t){return"/"+t},b={},w=function(o,e,a){let s=Promise.resolve();if(e&&e.length>0){let n=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),f=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=n(e.map(d=>{if(d=C(d),d in b)return;b[d]=!0;const p=d.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const l=document.createElement("link");if(l.rel=p?"stylesheet":L,p||(l.as="script"),l.crossOrigin="",l.href=d,f&&l.setAttribute("nonce",f),document.head.appendChild(l),p)return new Promise((T,A)=>{l.addEventListener("load",T),l.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${d}`)))})}))}function c(n){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=n,window.dispatchEvent(r),!r.defaultPrevented)throw n}return s.then(n=>{for(const r of n||[])r.status==="rejected"&&c(r.reason);return o().catch(c)})};let v=[];const g=localStorage.getItem("nome"),m=localStorage.getItem("turmaSelecionada");g&&(document.getElementById("nomeTreinador").textContent=g);m&&(document.getElementById("turmaSelecionada").textContent=m);async function y(){try{v=await(await fetch(`https://unifor-atletas.onrender.com/api/aluno/buscar?turma=${encodeURIComponent(m)}`)).json();const o=document.getElementById("lista-alunos");o.innerHTML='<h4 style="margin-top: 0; color: #142191;">Nome dos Alunos</h4>',v.forEach((e,a)=>{const s=document.createElement("div");s.className="aluno-card",s.innerHTML=`
        <span>${u(e.nome)}</span>
        <span>
          <input type="radio" name="aluno${a}" value="presente"> Presente
          <input type="radio" name="aluno${a}" value="ausente"> Ausente
        </span>
        <span>
          <button class="btn-editar" data-id="${e._id}" data-nome="${u(e.nome)}">Editar</button>
          <button class="btn-remover" data-id="${e._id}" data-nome="${u(e.nome)}">Remover</button>
        </span>
      `,o.appendChild(s)}),document.querySelectorAll(".btn-editar").forEach(e=>e.addEventListener("click",()=>$(e.dataset.id,e.dataset.nome))),document.querySelectorAll(".btn-remover").forEach(e=>e.addEventListener("click",()=>P(e.dataset.id,e.dataset.nome))),E()}catch(t){console.error("Erro ao carregar alunos:",t),i("Erro","Erro ao carregar lista de alunos.")}}async function M(){const t=document.getElementById("novoAlunoNome").value.trim();if(!t||!m)return i("Atenção","Nome e turma são obrigatórios.");try{const o=await fetch("https://unifor-atletas.onrender.com/api/aluno/cadastrar",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nome:t,turma:m})}),e=await o.json();o.ok?(i("Sucesso","Aluno adicionado com sucesso!"),document.getElementById("novoAlunoNome").value="",y()):i("Erro",e.error||"Erro ao adicionar aluno.")}catch{i("Erro","Erro ao adicionar aluno.")}}async function $(t,o){const e=document.getElementById("modal-container");e.innerHTML=`
    <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Aluno</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" id="inputNovoNome" value="${u(o)}" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="confirmarEdicao">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `;const{Modal:a}=await w(async()=>{const{Modal:c}=await import("./main-R5KTlRTc.js").then(n=>n.b);return{Modal:c}},__vite__mapDeps([0,1])),s=new a(document.getElementById("editModal"));s.show(),document.getElementById("confirmarEdicao").addEventListener("click",async()=>{const c=document.getElementById("inputNovoNome").value.trim();if(!c)return i("Erro","O nome não pode ser vazio.");try{const n=await fetch(`https://unifor-atletas.onrender.com/api/aluno/editar/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({nome:c})}),r=await n.json();s.hide(),n.ok?(i("Sucesso",r.message),y()):i("Erro",r.error)}catch{s.hide(),i("Erro","Erro ao editar aluno.")}})}async function P(t,o){if(await I("Remover Aluno",`Tem certeza que deseja remover o aluno <strong>${u(o)}</strong>?`))try{const a=await fetch(`https://unifor-atletas.onrender.com/api/aluno/remover/${t}`,{method:"DELETE"}),s=await a.json();a.ok?(i("Sucesso",s.message),y()):i("Erro",s.error)}catch{i("Erro","Erro ao remover aluno.")}}async function j(){const t=document.getElementById("dataSelecionada").value;if(!t)return i("Atenção","Selecione uma data!");const o={};v.forEach((e,a)=>{const s=document.querySelector(`input[name=aluno${a}]:checked`);o[e.nome]=s?s.value:null});try{const a=await(await fetch("https://unifor-atletas.onrender.com/api/presenca/registrar",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({turma:m,data:t,registros:o})})).json();i("Informação",a.message||"Presenças salvas!"),E()}catch{i("Erro","Erro ao salvar presença.")}}async function B(t,o,e){const a=document.getElementById("modal-container");a.innerHTML=`
    <div class="modal fade" id="editPresencaModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Presença</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p><strong>${u(t)}</strong> em ${S(o)}</p>
            <select id="novaPresenca" class="form-control">
              <option value="presente" ${e==="presente"?"selected":""}>Presente</option>
              <option value="ausente" ${e==="ausente"?"selected":""}>Ausente</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="confirmarEdicaoPresenca">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `;const{Modal:s}=await w(async()=>{const{Modal:n}=await import("./main-R5KTlRTc.js").then(r=>r.b);return{Modal:n}},__vite__mapDeps([0,1])),c=new s(document.getElementById("editPresencaModal"));c.show(),document.getElementById("confirmarEdicaoPresenca").addEventListener("click",async()=>{const n=document.getElementById("novaPresenca").value;try{const r=await fetch("https://unifor-atletas.onrender.com/api/presenca/editar",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({turma:m,data:o,nomeAluno:t,novaPresenca:n})}),f=await r.json();c.hide(),r.ok?(i("Sucesso",f.message||"Presença atualizada."),E()):i("Erro",f.error||"Erro ao atualizar presença.")}catch{c.hide(),i("Erro","Erro ao atualizar presença.")}})}async function E(){const t=document.getElementById("historico");t.innerHTML="";try{const e=await(await fetch(`https://unifor-atletas.onrender.com/api/presenca/historico?turma=${encodeURIComponent(m)}`)).json();if(!e||Object.keys(e).length===0){t.innerHTML="<p>Nenhum histórico encontrado.</p>";return}v.forEach(a=>{const s=Object.entries(e).filter(([c,n])=>n[a.nome]).map(([c,n])=>({data:c,status:n[a.nome]}));s.length&&(t.innerHTML+=`
          <details>
            <summary>${u(a.nome)}</summary>
            ${s.map(({data:c,status:n})=>`
              <p>
                ${S(c)} - <strong>${n}</strong>
                <button class="btn btn-sm btn-outline-primary" onclick="editarPresenca('${a.nome}', '${c}', '${n}')">Editar</button>
              </p>
            `).join("")}
          </details>`)})}catch{t.innerHTML="<p>Erro ao carregar histórico.</p>"}}function S(t){const[o,e,a]=t.split("-");return`${a}/${e}/${o}`}function k(){localStorage.clear(),window.location.href="loginTrein.html"}function u(t){const o=document.createElement("div");return o.textContent=t,o.innerHTML}document.addEventListener("DOMContentLoaded",y);window.adicionarAluno=M;window.salvarPresencas=j;window.logout=k;window.carregarHistorico=E;window.editarAluno=$;window.removerAluno=P;window.editarPresenca=B;
