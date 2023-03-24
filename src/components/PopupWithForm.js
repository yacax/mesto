import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._inputsNameList = this._inputsList.map((item) => item.name);
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._submitButtonText = this._submitButton.value;
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    this._submitButton.value = isLoading ? loadingText : this._submitButtonText;
  }

  setInputsInitial(initialInputsValuesList) {
    this._inputsList.forEach((item) => {
      if (item.name in initialInputsValuesList) item.value = initialInputsValuesList[item.name];
    });
  }

  _getInputValues() {
    return this._inputsList.reduce((acc, item) => { return { ...acc, [item.name]: item.value, } }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._submitForm(evt, this._getInputValues()));
  }

  close() {
    super.close();
    this._form.reset();
  }

  changeSubmitButtonText(buttonText) {
    this._submitButton.value = buttonText;
  }
}


export { PopupWithForm }