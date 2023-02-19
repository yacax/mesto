import { Card } from './card.js'
import { FormValidator } from './FormValidator.js';
import { initialCards } from './data.js'

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const addPopupElementButton = profile.querySelector('.profile__add-button');
const editProfileButton = profile.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup_name_profile');
const savePopupSubmitProfile = popupProfile.querySelector('.popup__form_name_profile');
const profileTitleInput = popupProfile.querySelector('.popup__input_name_title');
const profileSubtitleInput = popupProfile.querySelector('.popup__input_name_subtitle');

const popupElement = document.querySelector('.popup_name_element');
const savePopupSubmitElement = popupElement.querySelector('.popup__form_name_element');

const elementTitleInput = popupElement.querySelector('.popup__input_name_title');
const elementSubtitleInput = popupElement.querySelector('.popup__input_name_subtitle');

const popupImage = document.querySelector('.popup_name_image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const popupImageImage = popupImage.querySelector('.popup__image');

const popupList = Array.from(document.querySelectorAll('.popup'));

const formValidators = {};

const config = {
  selectorElementsList: '.elements',
  selectorElementTemplate: '.element-template'
};

const elementsList = document.querySelector(config.selectorElementsList);

initialCards.forEach((item) => elementsList.append(createCard(item)))

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    };
  });
});

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

function openPopupProfile() {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
  formValidators['profile'].resetValidation();
};

function openAddElement() {
  openPopup(popupElement);
  formValidators['element'].resetValidation();
};

function handleCardClick(name, link) {
  popupImageImage.src = link;
  popupImageImage.alt = name;
  popupImageTitle.textContent = name;
  openPopup(popupImage);
};

function handleProfileSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closePopup(event.target.closest('.popup'));
};

function handleElementSubmit(event) {
  event.preventDefault();
  const item = { name: elementTitleInput.value, link: elementSubtitleInput.value };
  elementsList.prepend(createCard(item))
  event.target.reset();
  closePopup(event.target.closest('.popup'));
};

function createCard(item) {
  const card = new Card(config.selectorElementTemplate, item, handleCardClick);
  return card.getElement();
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement, handleCardClick)
    const formName = formElement.getAttribute('name')
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
savePopupSubmitProfile.addEventListener('submit', handleProfileSubmit);
addPopupElementButton.addEventListener('click', openAddElement);
savePopupSubmitElement.addEventListener('submit', handleElementSubmit);