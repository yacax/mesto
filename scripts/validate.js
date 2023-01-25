const validationSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error-style',
  errorClass: 'popup__error-text_active'
}

enableValidation(validationSetting);

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector));
  formList.forEach((form) => { setEventListeners(form) });
};

function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputs, buttonElement) {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(validationSetting.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(validationSetting.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

function setEventListeners(form) {
  const inputs = Array.from(form.querySelectorAll(validationSetting.inputSelector));
  const buttonElement = form.querySelector(validationSetting.submitButtonSelector);

  toggleButtonState(inputs, buttonElement);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(form, inputElement);
      toggleButtonState(inputs, buttonElement);
    });
  });
};

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSetting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSetting.errorClass);
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSetting.inputErrorClass);
  errorElement.classList.remove(validationSetting.errorClass);
  errorElement.textContent = '';
};

function isValid(form, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(form, inputElement);
  };
};
