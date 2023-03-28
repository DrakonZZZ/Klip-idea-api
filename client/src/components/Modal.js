class Modal {
  constructor() {
    this._modal = document.getElementById('modal');
    this._btnPlus = document.getElementById('modal-btn');
    this.#addEventListners();
  }

  #collapseOn() {
    this._modal.style.display = 'block';
  }

  #collapseOff() {
    this._modal.style.display = 'none';
  }

  #outerClick(e) {
    e.target === this._modal ? this.#collapseOff() : null;
  }

  #addEventListners() {
    this._btnPlus.addEventListener('click', () => this.#collapseOn());
    window.addEventListener('click', (e) => this.#outerClick(e));
    window.addEventListener('collapseOff', () => this.#collapseOff());
  }
}

export default Modal;
