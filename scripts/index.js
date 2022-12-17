let popup = document.querySelector('.popup');

let editProfileButton = document.querySelector('.profile__edit-button');
let savePopupButton = popup.querySelector('.popup__save-button');
let closePopupButton = popup.querySelector('.popup__close-button');

let profileTitleInput;
let profileSubtitleInput;

let profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');



function openPopup() {
  profileTitleInput = popup.querySelector('.popup__text-input_name_title');
  profileSubtitleInput = popup.querySelector('.popup__text-input_name_subtitle');

  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;

  popup.classList.add('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  if (profileTitleInput.value.length > 35) {
    alert('Пожалуйста, используйте более короткое имя')
  } else {
    profileTitle.textContent = profileTitleInput.value;
    profileSubtitle.textContent = profileSubtitleInput.value;
    closePopup();
  }
}

function closePopup() {
  popup.classList.remove('popup_opened');
}


editProfileButton.addEventListener('click', openPopup);

savePopupButton.addEventListener('click', handleFormSubmit);

closePopupButton.addEventListener('click', closePopup)
