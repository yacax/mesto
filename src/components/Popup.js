class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);

    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByMouse = this._closeByMouse.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    };
  };

  _closeByMouse(event) {
    if (event.target.classList.contains('popup_opened')) {
      this.close();
    }
    if (event.target.classList.contains('popup__close-button')) {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._closeByMouse);
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };
}

export { Popup }