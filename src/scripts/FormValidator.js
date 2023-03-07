class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._form = form;

    this._inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._setEventListeners = this._setEventListeners.bind(this);
    this._isValid = this._isValid.bind(this);
    this._showInputError = this._showInputError.bind(this);
    this._hideInputError = this._hideInputError.bind(this);
    this._toggleButtonState = this._toggleButtonState.bind(this);
    this._hasInvalidInput = this._hasInvalidInput.bind(this);
  };

  enableValidation() {
    this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState(); 

    this._inputsList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

  };

  _setEventListeners() {
    this._toggleButtonState();

    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    };
  };

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputsList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  };

};

export { FormValidator }