import { config, addPopupElementButton, editProfileButton } from '../utils/constants.js';
import { initialCards } from '../utils/data.js';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';


const user = new UserInfo(config.selectorUserName, config.selectorUserAbout);

const profilePopup = new PopupWithForm(config.selectorPopupProfile, submitProfile);
const elementPopup = new PopupWithForm(config.selectorPopupElement, submitNewElement);
const popupImage = new PopupWithImage(config.selectorPopupImage);

const formValidators = {};

const elementsList = new Section({ items: initialCards.reverse(), renderer: renderer }, config.selectorElementsList);
elementsList.renderer();

elementPopup.setEventListeners();
profilePopup.setEventListeners();
popupImage.setEventListeners();

function renderer(item) {
  elementsList.addItem(createCard(item));
};

function openPopupProfile() {
  profilePopup.open();
  profilePopup.setInputsInitial(user.getUserInfo());
  formValidators['profile'].resetValidation();
};

function submitProfile(evt, newInfo) {
  evt.preventDefault();
  user.setUserInfo(newInfo.name, newInfo.about);
  profilePopup.close();
};

function openAddElement() {
  elementPopup.open();
  formValidators['element'].resetValidation();
};

function submitNewElement(evt, newInfo) {
  evt.preventDefault();
  elementsList.addItem(createCard(newInfo));
  elementPopup.close();
}

function createCard(item) {
  const card = new Card(config.selectorElementTemplate, item, handleCardClick);
  return card.getElement();
};

function handleCardClick(name, link) {
  popupImage.open(name, link);
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement, handleCardClick);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error-style',
  errorClass: 'popup__error-text_active'
});

editProfileButton.addEventListener('click', openPopupProfile);
addPopupElementButton.addEventListener('click', openAddElement);