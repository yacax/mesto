import { Card } from './card.js'
import { FormValidator } from './FormValidator.js';
import { initialCards } from './data.js';
import { Section } from './section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const config = {
  selectorElementsList: '.elements',
  selectorElementTemplate: '.element-template',
  selectorPopup: '.popup',
  selectorPopupProfile: '.popup_name_profile',
  selectorPopupElement: '.popup_name_element',
  selectorPopupImage: '.popup_name_image',
  selectorUserName: '.profile__title',
  selectorUserAbout: '.profile__subtitle',
};

const profile = document.querySelector('.profile');
const addPopupElementButton = profile.querySelector('.profile__add-button');
const editProfileButton = profile.querySelector('.profile__edit-button');

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
  this.addItem(createCard(item));
};

function openPopupProfile() {
  profilePopup.open();
  profilePopup.setInputsInitial(user.getUserInfo());
  formValidators['profile'].resetValidation();
};

function submitProfile(evt) {
  evt.preventDefault();
  const newUserData = profilePopup.getDataFromForm();
  user.setUserInfo(newUserData.name, newUserData.about);
  profilePopup.close();
};

function openAddElement() {
  elementPopup.open();
  formValidators['element'].resetValidation();
};

function submitNewElement(evt) {
  evt.preventDefault();
  const newItem = new Section({ items: [elementPopup.getDataFromForm()], renderer: renderer }, config.selectorElementsList);
  newItem.renderer();
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