import {
  config,
  addPopupElementButton,
  editProfileButton,
  token, baseUrl,
  editAvatar
} from '../utils/constants.js';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';
import { Api } from '../components/Api.js';

const formValidators = {};

let cardIdForDelete = '';
let elementForDelete = '';

let elementsList = [];

const user = new UserInfo(config.selectorUserName, config.selectorUserAbout, config.selectorUserAvatar);

const profilePopup = new PopupWithForm(config.selectorPopupProfile, submitProfile);
const elementPopup = new PopupWithForm(config.selectorPopupElement, submitNewElement);
const popupImage = new PopupWithImage(config.selectorPopupImage);
const popupConfirm = new PopupWithForm(config.selectorPopupConfirm, confirmDeleteElement);
const popupNewAvatar = new PopupWithForm(config.selectorPopupAvatar, confirmUpdateAvatar);

elementPopup.setEventListeners();
profilePopup.setEventListeners();
popupImage.setEventListeners();
popupConfirm.setEventListeners();
popupNewAvatar.setEventListeners();

const api = new Api({
  baseUrl,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getInitialCards(), api.getUserData()])
  .then(([cards, userData]) => {
    elementsList = new Section({ items: cards.reverse(), renderItems: renderItems }, config.selectorElementsList);
    user.setUserInfo(userData);
    elementsList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
};

function renderItems(item) {
  loadImage(item.link)
    .then(() => {
      const newCard = createCard(item);
      elementsList.addItem(newCard);
    })
    .catch((error) => {
      console.log('Error loading image:', error);
    });
};

function openPopupProfile() {
  profilePopup.open();
  profilePopup.setInputsInitial(user.getUserInfo());
  formValidators['profile'].resetValidation();
};

function submitProfile(evt, newInfo) {
  evt.preventDefault();
  profilePopup.renderLoading(true);
  api.patchUserData(newInfo.name, newInfo.about)
    .then((res) => {
      user.setUserInfo(res);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      profilePopup.renderLoading()
    );
};

function openAddElement() {
  elementPopup.open();
  formValidators['element'].resetValidation();
};

function submitNewElement(evt, newInfo) {
  evt.preventDefault();
  elementPopup.renderLoading(true);

  loadImage(newInfo.link)
    .then(() => {
      api.postNewCard(newInfo)
        .then((res) => {
          elementsList.addItem(createCard(res))
          elementPopup.close();
        });
    })
    .catch((error) => {
      console.log('Error loading image:', error);
    })
    .finally(() => elementPopup.renderLoading()
    );
};

function confirmDeleteElement(evt) {
  evt.preventDefault();
  popupConfirm.renderLoading(true, 'Удаление...');
  api.deleteCard(cardIdForDelete)
    .then(() => elementsList.deleteItem(elementForDelete))
    .then(() => {
      popupConfirm.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupConfirm.renderLoading()
    );
};

function openPopupConfirmDeleteElement(cardId, elementId) {
  cardIdForDelete = cardId;
  elementForDelete = elementId;
  popupConfirm.open();
};

function openPopupEditAvatar() {
  popupNewAvatar.open();
  formValidators['avatar'].resetValidation();
};

function confirmUpdateAvatar(evt, newAvatarLink) {
  evt.preventDefault();
  popupNewAvatar.renderLoading(true);
  loadImage(newAvatarLink.avatar)
    .then(() => {
      api.patchAvatar(newAvatarLink.avatar)
        .then((res) => user.setUserInfo(res));
      popupNewAvatar.close();
    })
    .catch((error) => {
      console.log('Error loading image:', error);
    })
    .finally(() => popupNewAvatar.renderLoading()
    );
};

function createCard(item) {
  const card = new Card(config.selectorElementTemplate, item, handleCardClick, openPopupConfirmDeleteElement, user.getUserInfo().id, api);
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
editAvatar.addEventListener('click', openPopupEditAvatar);