const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const addPopupElementButton = profile.querySelector('.profile__add-button');
const editProfileButton = profile.querySelector('.profile__edit-button');

const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

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

const closeButtons = document.querySelectorAll('.popup__close-button');

const popupList = Array.from(document.querySelectorAll('.popup'));

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(addInitialCards);

function addInitialCards(item) {
  elementsList.append(createCard(item));
};

closeButtons.forEach((button) => {
  button.addEventListener('click', (event) => { closePopup(event.target.closest('.popup')) });
});

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closePopup(popupName) })
  popupName.addEventListener('click', (event) => { if (checkOverlay(event)) closePopup(popupName) })
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', (event) => { if (event.key === 'Escape') closePopup(popupName) })
}

function checkOverlay(event) {
  return event.target.classList.contains('popup') || event.target.classList.contains('popup__container');
}

function createCard(item) {
  const newElement = elementTemplate.cloneNode(true);

  newElement.querySelector('.element__title').textContent = item.name;
  newElement.querySelector('.element__image').src = item.link;
  newElement.querySelector('.element__image').alt = item.name;

  newElement.querySelector('.element__favorite').addEventListener('click', switchFavorite);
  newElement.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  newElement.querySelector('.element__image').addEventListener('click', openElementImage);

  return newElement;
};

function openPopupProfile() {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  letInputsEvents(popupProfile)
  openPopup(popupProfile);
};

function letInputsEvents(form) {
  const inputsList = form.querySelectorAll('.popup__input');
  inputsList.forEach((input) => { input.dispatchEvent(new Event('input')) })
}

function openAddElement() {
  openPopup(popupElement);
};

function openElementImage(event) {
  openPopup(popupImage);
  popupImageImage.src = event.target.closest('.element').querySelector('.element__image').src;
  popupImageImage.alt = event.target.closest('.element').querySelector('.element__image').alt;
  popupImageTitle.textContent = event.target.closest('.element').querySelector('.element__title').textContent;
};

function switchFavorite(event) { event.target.classList.toggle('element__favorite_active') };

function deleteElement(event) { event.target.closest('.element').remove() };

function handleProfileSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closePopup(event.target.closest('.popup'));
};

function handleElementSubmit(event) {
  event.preventDefault();
  const item = { name: elementTitleInput.value, link: elementSubtitleInput.value };
  elementsList.prepend(createCard(item));
  event.target.reset();
  closePopup(event.target.closest('.popup'));
};

editProfileButton.addEventListener('click', openPopupProfile);
savePopupSubmitProfile.addEventListener('submit', handleProfileSubmit);

addPopupElementButton.addEventListener('click', openAddElement);
savePopupSubmitElement.addEventListener('submit', handleElementSubmit);

