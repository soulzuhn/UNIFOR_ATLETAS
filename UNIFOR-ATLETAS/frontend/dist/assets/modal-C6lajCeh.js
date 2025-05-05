import{b as l}from"./main-C-PKB4K0.js";function i(a,d){const t=document.getElementById("modal-container");t.innerHTML=`
  <div class="modal fade" id="alertModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${a}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <div class="modal-body">
          <p>${d}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>
`,new l.Modal(document.getElementById("alertModal")).show()}function c(a,d){return new Promise(t=>{const n=document.getElementById("modal-container");n.innerHTML=`
      <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${a}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
              <p>${d}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelBtn">Cancelar</button>
              <button type="button" class="btn btn-primary" id="confirmBtn">OK</button>
            </div>
          </div>
        </div>
      </div>
    `;const o=document.getElementById("confirmModal"),e=new l.Modal(o);e.show(),o.querySelector("#confirmBtn").addEventListener("click",()=>{e.hide(),t(!0)}),o.querySelector("#cancelBtn").addEventListener("click",()=>{e.hide(),t(!1)})})}export{c as a,i as s};
