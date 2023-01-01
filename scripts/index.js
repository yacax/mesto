const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const addPopupElementButton = profile.querySelector('.profile__add-button');
const editProfileButton = profile.querySelector('.profile__edit-button');

const elementsList = document.querySelector('.elements');

const popupProfile = document.querySelector('.popup_name_profile');
const savePopupSubmitProfile = popupProfile.querySelector('.popup__window_name_profile');
const profileTitleInput = popupProfile.querySelector('.popup__text-input_name_title');
const profileSubtitleInput = popupProfile.querySelector('.popup__text-input_name_subtitle');

const popupElement = document.querySelector('.popup_name_element');
const savePopupSubmitElement = popupElement.querySelector('.popup__window_name_element');
const elementTitleInput = popupElement.querySelector('.popup__text-input_name_title');
const elementSubtitleInput = popupElement.querySelector('.popup__text-input_name_subtitle');

const popupImage = document.querySelector('.popup_name_image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const popupImageImage = popupImage.querySelector('.popup__image');

const closeButtons = document.querySelectorAll('.popup__close-button');

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
  button.addEventListener('click', closePopup);
});

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function createCard(item) {
  const elementTemplate = document.querySelector('.element-template').content;
  const newElement = elementTemplate.cloneNode(true);

  if (item.name.length === 0) item.name = 'без названия';

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
  openPopup(popupProfile);
};

function openAddElement() {
  openPopup(popupElement);
};

function openElementImage(evt) {
  openPopup(popupImage);
  popupImageImage.src = evt.target.closest('.element').querySelector('.element__image').src;
  popupImageImage.alt = evt.target.closest('.element').querySelector('.element__image').alt;
  popupImageTitle.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
};

function switchFavorite(evt) { evt.target.classList.toggle('element__favorite_active') };

function deleteElement(evt) { evt.target.closest('.element').remove() };

function handleProfileSubmit(evt) {
  evt.preventDefault();

  if (profileTitleInput.value.length > 35) {
    alert('Пожалуйста, используйте более короткое имя');
  } else {
    profileTitle.textContent = profileTitleInput.value;
    profileSubtitle.textContent = profileSubtitleInput.value;
    closePopup(evt);
  }
};

function handleElementSubmit(evt) {
  evt.preventDefault();

  const item = { name: elementTitleInput.value, link: elementSubtitleInput.value };
  elementsList.prepend(createCard(item));
  evt.target.reset();
  closePopup(evt);
};

editProfileButton.addEventListener('click', openPopupProfile);
savePopupSubmitProfile.addEventListener('submit', handleProfileSubmit);

addPopupElementButton.addEventListener('click', openAddElement);
savePopupSubmitElement.addEventListener('submit', handleElementSubmit);