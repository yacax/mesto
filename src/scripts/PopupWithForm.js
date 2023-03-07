import { Popup } from "./popup.js";

class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._inputsNameList = this._inputsList.map((item) => item.name);
  }

  setInputsInitial(initialInputsValuesList) {
    this._inputsList.forEach((item) => {
      if (item.name in initialInputsValuesList) item.value = initialInputsValuesList[item.name];
    });
  }

  _getInputValues() {
    return this._inputsList;
  }

  getDataFromForm() {
    return this._inputsList.reduce((acc, item) => { return { ...acc, [item.name]: item.value, } }, {});
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._closeByMouse);
    document.addEventListener('keydown', this._handleEscClose);
    this._form.addEventListener('submit', this._submitForm);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._form.reset();
  }
}

export { PopupWithForm }