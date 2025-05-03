 import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
export function showModalAlert(title, message) {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
  <div class="modal fade" id="alertModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>
`;

    const modal = new Modal(document.getElementById('alertModal'));
    modal.show();
}

export function showModalConfirm(title, message) {
  return new Promise((resolve) => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
      <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
              <p>${message}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelBtn">Cancelar</button>
              <button type="button" class="btn btn-primary" id="confirmBtn">OK</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const modalElement = document.getElementById('confirmModal');
    const modal = new Modal(modalElement);

    modal.show();

    modalElement.querySelector('#confirmBtn').addEventListener('click', () => {
      modal.hide();
      resolve(true);
    });

    modalElement.querySelector('#cancelBtn').addEventListener('click', () => {
      modal.hide();
      resolve(false);
    });
  });
}