let popupProfile = document.querySelector('.popup_name_profile');
let popupElement = document.querySelector('.popup_name_element');

let editProfileButton = document.querySelector('.profile__edit-button');
let closePopupProfileButton = popupProfile.querySelector('.popup__close-button');

let savePopupSubmitProfile = popupProfile.querySelector('.popup__window');
let savePopupSubmitElement = popupElement.querySelector('.popup__window');





let closePopupElementButton = popupElement.querySelector('.popup__close-button');
let addPopupElementButton = document.querySelector('.profile__add-button');





let profileTitleInput = popupProfile.querySelector('.popup__text-input_name_title');
let profileSubtitleInput = popupProfile.querySelector('.popup__text-input_name_subtitle');

let profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');



const elementTemplate = document.querySelector('.element-template').content;

const elementsList = document.querySelector('.elements');

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

initialCards.forEach(addElement);

  // const elementElement = elementTemplate.cloneNode(true);

  // elementElement.querySelector('.element__title').textContent = element.name;
  // elementElement.querySelector('.element__image').src = element.link;

  // elementsList.append(elementElement);

// })

function addElement(element) {

  const elementElement = elementTemplate.cloneNode(true);

  elementElement.querySelector('.element__title').textContent = element.name;
  elementElement.querySelector('.element__image').src = element.link;

  elementsList.append(elementElement);


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

  console.log(evt)
  evt.preventDefault();

  addElement()
  
}

function closePopup() {
  this.parentElement.parentNode.classList.remove('popup_opened');
}

// Избранное

elementsList.addEventListener('click', (eventTarget) => {
  if (eventTarget.target.classList.contains('element__favorite')) { eventTarget.target.classList.toggle('element__favorite_active') }
});


editProfileButton.addEventListener('click', openPopupProfile);

closePopupProfileButton.addEventListener('click', closePopup);

savePopupSubmitProfile.addEventListener('submit', handleFormSubmit);





addPopupElementButton.addEventListener('click', () => popupElement.classList.add('popup_opened'));

closePopupElementButton.addEventListener('click', closePopup);

savePopupSubmitElement.addEventListener('submit', ElementSubmit);