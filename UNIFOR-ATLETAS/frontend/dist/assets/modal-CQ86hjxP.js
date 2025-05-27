import{a as l}from"./main-R5KTlRTc.js";function i(t,d){const a=document.getElementById("modal-container");a.innerHTML=`
  <div class="modal fade" id="alertModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${t}</h5>
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
`,new l.Modal(document.getElementById("alertModal")).show()}function c(t,d){return new Promise(a=>{const n=document.getElementById("modal-container");n.innerHTML=`
      <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${t}</h5>
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
    `;const o=document.getElementById("confirmModal"),e=new l.Modal(o);e.show(),o.querySelector("#confirmBtn").addEventListener("click",()=>{e.hide(),a(!0)}),o.querySelector("#cancelBtn").addEventListener("click",()=>{e.hide(),a(!1)})})}export{c as a,i as s};
