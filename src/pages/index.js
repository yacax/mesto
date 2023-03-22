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
var userId = '';
var cardIdForDelete = '';
var elementForDelete = '';
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

function updateUserInfo() {
  api.getUserData()
    .then((result) => {
      user.setUserInfo(result.name, result.about, result.avatar);
      userId = result._id;
    })
    .catch((err) => {
      console.log(err);
    });
}

Promise.all([api.getInitialCards(), api.getUserData()])
  .then(([cards, userData]) => {
    elementsList = new Section({ items: cards.reverse(), renderer: renderer }, config.selectorElementsList);
    user.setUserInfo(userData.name, userData.about, userData.avatar);
    userId = userData._id;
    elementsList.renderer();
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
}

function renderer(item) {
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
  profilePopup.changeSubmitButtonText('Сохранить')
  profilePopup.setInputsInitial(user.getUserInfo());
  formValidators['profile'].resetValidation();
};

function submitProfile(evt, newInfo) {
  evt.preventDefault();
  profilePopup.changeSubmitButtonText('Сохранение...');
  api.patchUserData(newInfo.name, newInfo.about)
    .then((res) => {
      updateUserInfo();
      profilePopup.close();
    });
};

function openAddElement() {
  elementPopup.changeSubmitButtonText('Создать');
  elementPopup.open();
  formValidators['element'].resetValidation();
};

function submitNewElement(evt, newInfo) {
  evt.preventDefault();
  elementPopup.changeSubmitButtonText('Сохранение...');

  loadImage(newInfo.link)
    .then(() => {
      api.postNewCard(newInfo)
        .then((res) => {
          elementsList.addItem(createCard(res))
          elementPopup.close();
        });
    })
    .catch((error) => {
      elementPopup.changeSubmitButtonText('Ошибка загрузки!');
      console.log('Error loading image:', error);
      setTimeout(function () {
        elementPopup.changeSubmitButtonText('Создать');
      }, 2000);
    });
}

function confirmDeleteElement(evt) {
  evt.preventDefault();
  popupConfirm.changeSubmitButtonText('Удаление...');
  api.deleteCard(cardIdForDelete)
    .then(() => elementsList.deleteItem(elementForDelete))
    .then(() => {
      popupConfirm.close()
      popupConfirm.changeSubmitButtonText('Да');
    })
    .catch((err) => {
      popupConfirm.changeSubmitButtonText('Что-то пошло не так...');
      console.log(err);
    });
}

function openPopupConfirmDeleteElement(cardId, elementId) {
  cardIdForDelete = cardId;
  elementForDelete = elementId;
  popupConfirm.open();
}

function openPopupEditAvatar() {
  popupNewAvatar.changeSubmitButtonText('Сохранить');
  popupNewAvatar.open();
  formValidators['avatar'].resetValidation();
}

function confirmUpdateAvatar(evt, newAvatarLink) {
  evt.preventDefault();
  popupNewAvatar.changeSubmitButtonText('Сохранение...');  
  loadImage(newAvatarLink.avatar)
    .then(() => {
      api.patchAvatar(newAvatarLink.avatar)
        .then((res) => user.setAvatar(res.avatar))
        .then(() => popupNewAvatar.close())
    })
    .catch((error) => {
      popupNewAvatar.changeSubmitButtonText('Ошибка загрузки!');
      console.log('Error loading image:', error);
      setTimeout(function () {
        popupNewAvatar.changeSubmitButtonText('Создать');
      }, 2000);
    });
}

function createCard(item) {
  const card = new Card(config.selectorElementTemplate, item, handleCardClick, openPopupConfirmDeleteElement, userId, api);
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

