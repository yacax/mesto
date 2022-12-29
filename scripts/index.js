const popupProfile = document.querySelector('.popup_name_profile');
const popupElement = document.querySelector('.popup_name_element');
const popupImage = document.querySelector('.popup_name_image');

const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupProfileButton = popupProfile.querySelector('.popup__close-button');

const savePopupSubmitProfile = popupProfile.querySelector('.popup__window_name_profile');
const savePopupSubmitElement = popupElement.querySelector('.popup__window_name_element');
const closePopupImageButton = popupImage.querySelector('.popup__close-button')

const closePopupElementButton = popupElement.querySelector('.popup__close-button');
const addPopupElementButton = document.querySelector('.profile__add-button');

const elementTemplate = document.querySelector('.element-template').content;

const elementsList = document.querySelector('.elements');

const profileTitleInput = popupProfile.querySelector('.popup__text-input_name_title');
const profileSubtitleInput = popupProfile.querySelector('.popup__text-input_name_subtitle');

const elementTitleInput = popupElement.querySelector('.popup__text-input_name_title');
const elementSubtitleInput = popupElement.querySelector('.popup__text-input_name_subtitle');

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

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

initialCards.reverse().forEach(addElement);

function addElement(element) {
  const elementElement = elementTemplate.cloneNode(true);

  elementElement.querySelector('.element__title').textContent = element.name;
  elementElement.querySelector('.element__image').src = element.link;
  elementElement.querySelector('.element__image').alt = element.name;

  elementsList.prepend(elementElement);
}

function openPopupProfile() {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;

  popupProfile.classList.add('popup_opened');
}

function closePopup() {
  this.parentElement.parentNode.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  if (profileTitleInput.value.length > 35) {
    alert('Пожалуйста, используйте более короткое имя')
  } else {
    profileTitle.textContent = profileTitleInput.value;
    profileSubtitle.textContent = profileSubtitleInput.value;
    popupProfile.classList.remove('popup_opened');
  }
}

function handleElementSubmit(evt) {
  evt.preventDefault();

  addElement({ name: elementTitleInput.value, link: elementSubtitleInput.value });

  elementTitleInput.value = '';
  elementSubtitleInput.value = '';

  popupElement.classList.remove('popup_opened');
}

function openPopupImage(evt) {
  popupImage.classList.add('popup_opened');
  popupImage.querySelector('.popup__image').src = evt.querySelector('.element__image').src
  popupImage.querySelector('.popup__image-title').textContent = evt.querySelector('.element__title').textContent
}

function openAddElement() {
  popupElement.classList.add('popup_opened');
}

function switchFavorite(eventTarget) {
  if (eventTarget.target.classList.contains('element__favorite')) { eventTarget.target.classList.toggle('element__favorite_active') };
}

function deleteElement(eventTarget) {
  if (eventTarget.target.classList.contains('element__delete-button')) { eventTarget.target.parentElement.remove() };
}

function openElementImage(eventTarget) {
  if (eventTarget.target.classList.contains('element__image')) { openPopupImage(eventTarget.target.parentElement) };
}

editProfileButton.addEventListener('click', openPopupProfile);
closePopupProfileButton.addEventListener('click', closePopup);
savePopupSubmitProfile.addEventListener('submit', handleFormSubmit);

addPopupElementButton.addEventListener('click', openAddElement);
closePopupElementButton.addEventListener('click', closePopup);
savePopupSubmitElement.addEventListener('submit', handleElementSubmit);

closePopupImageButton.addEventListener('click', closePopup);

elementsList.addEventListener('click', switchFavorite);
elementsList.addEventListener('click', deleteElement);
elementsList.addEventListener('click', openElementImage);