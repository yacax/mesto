function enableValidation () {
 
  const formList = Array.from( document.querySelectorAll('.popup__form') );

  formList.forEach((form) => {
    
    setEventListeners(form);
  });
};

enableValidation(); 


// ================== требования к включению валидации

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }); 


function setEventListeners (form) {
 
  const inputs = Array.from(form.querySelectorAll('.popup__input') );
    
  inputs.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {
      isValid(form, inputElement)
      
    })
    
  })

}



// function toggleButtonState (form) {
//   if (form.validity.valid) {
//     // buttonElement.classList.add('button_inactive');
//     console.log(form.validity.valid)
//   } else {
//     // buttonElement.classList.remove('button_inactive');
//     console.log(form.validity.valid)
//   }
// }


  function showInputError(formElement, inputElement, errorMessage) {
    
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    const toggleButton = formElement.querySelector('.popup__save-button');
    toggleButton.classList.add('popup__save-button_disabled');

    
    inputElement.classList.add('popup__input_error-style');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error-text_active');
    
  };
  
  function hideInputError(formElement, inputElement) {
   
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    const toggleButton = formElement.querySelector('.popup__save-button');
    toggleButton.classList.remove('popup__save-button_disabled');
    
    inputElement.classList.remove('popup__input_error-style');
    errorElement.classList.remove('popup__error-text_active');
    errorElement.textContent = '';
  }; 


  function isValid (form, inputElement) {

    if (!inputElement.validity.valid) {
      
      showInputError(form, inputElement, inputElement.validationMessage);

      
    } else {
      
      hideInputError(form, inputElement);
    }
    
   

  }
