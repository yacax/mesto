let popupProfile = document.querySelector('.popup_name_profile');
let popupElement = document.querySelector('.popup_name_element');
let popupImage = document.querySelector('.popup_name_image');


let editProfileButton = document.querySelector('.profile__edit-button');
let closePopupProfileButton = popupProfile.querySelector('.popup__close-button');

let savePopupSubmitProfile = popupProfile.querySelector('.popup__window');
let savePopupSubmitElement = popupElement.querySelector('.popup__window');
let closePopupImageButton = popupImage.querySelector('.popup__close-button')

let closePopupElementButton = popupElement.querySelector('.popup__close-button');
let addPopupElementButton = document.querySelector('.profile__add-button');

let profileTitleInput = popupProfile.querySelector('.popup__text-input_name_title');
let profileSubtitleInput = popupProfile.querySelector('.popup__text-input_name_subtitle');

let elementTitleInput = popupElement.querySelector('.popup__text-input_name_title');
let elementSubtitleInput = popupElement.querySelector('.popup__text-input_name_subtitle');

let profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');



const elementTemplate = document.querySelector('.element-template').content;

const elementsList = document.querySelector('.elements');

var initialCards = [
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

  let elementElement = elementTemplate.cloneNode(true);

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

function ElementSubmit(evt) {


  evt.preventDefault();

  addElement({ name: elementTitleInput.value, link: elementSubtitleInput.value });

  elementTitleInput.value = '';
  elementSubtitleInput.value = '';

  popupElement.classList.remove('popup_opened');

}

function closePopup() {
  this.parentElement.parentNode.classList.remove('popup_opened');
}

// Избранное

elementsList.addEventListener('click', (eventTarget) => {
  if (eventTarget.target.classList.contains('element__favorite')) { eventTarget.target.classList.toggle('element__favorite_active') 
} else if (eventTarget.target.classList.contains('element__delete-button')) { eventTarget.target.parentElement.remove() 
} else if (eventTarget.target.classList.contains('element__image')) { openPopupImage(eventTarget.target.parentElement) }
});



function openPopupImage (evt) {
  console.log(evt.querySelector('.element__image').src)
  popupImage.classList.add('popup_opened');
  popupImage.querySelector('.popup__image').src = evt.querySelector('.element__image').src
  popupImage.querySelector('.popup__image-title').textContent = evt.querySelector('.element__title').textContent
}



editProfileButton.addEventListener('click', openPopupProfile);

closePopupProfileButton.addEventListener('click', closePopup);

savePopupSubmitProfile.addEventListener('submit', handleFormSubmit);


addPopupElementButton.addEventListener('click', () => popupElement.classList.add('popup_opened'));

closePopupElementButton.addEventListener('click', closePopup);

savePopupSubmitElement.addEventListener('submit', ElementSubmit);

closePopupImageButton.addEventListener('click', closePopup);