function enableValidation(setting) {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((form) => { setEventListeners(form, setting) });
};

function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputs, buttonElement, setting) {
  if (hasInvalidInput(inputs)) {
    
    buttonElement.classList.add(setting.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(setting.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

function setEventListeners(form, setting) {
  const inputs = Array.from(form.querySelectorAll(setting.inputSelector));
  const buttonElement = form.querySelector(setting.submitButtonSelector);

 toggleButtonState(inputs, buttonElement, setting);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(form, inputElement, setting);
      toggleButtonState(inputs, buttonElement, setting);
    });
  });

  form.addEventListener('submit', () => { 
    toggleButtonState(inputs, buttonElement, setting)
  });
};

function showInputError(formElement, inputElement, errorMessage, setting) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.errorClass);
};

function hideInputError(formElement, inputElement, setting) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.classList.remove(setting.errorClass);
  errorElement.textContent = '';
};

function isValid(form, inputElement, setting) {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage, setting);
  } else {
    hideInputError(form, inputElement, setting);
  };
};

enableValidation( {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error-style',
  errorClass: 'popup__error-text_active'
} );