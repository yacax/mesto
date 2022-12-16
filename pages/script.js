let editProfileButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');



let profileTitleInput = popup.querySelector('.popup__profile-title-input')
let profileTitle = profile.querySelector('.profile__title');
profileTitleInput.value = profileTitle.textContent;

let profileSubtitleInput = popup.querySelector('.popup__profile-subtitle-input')
let profileSubtitle = profile.querySelector('.profile__subtitle');
profileSubtitleInput.value = profileSubtitle.textContent;



function profileEdit () {
    // let popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');


    // let profileTitle = profile.querySelector('.profile__title');


    // let profileTitleInput = popup.querySelector('.popup__profile-title-input')
    // let profileTitle = profile.querySelector('.profile__title');
    // profileTitleInput.value = profileTitle.textContent;

    // let profileSubtitleInput = popup.querySelector('.popup__profile-subtitle-input')
    // let profileSubtitle = profile.querySelector('.profile__subtitle');
    // profileSubtitleInput.value = profileSubtitle.textContent;

    console.log(profileTitle.textContent)
    console.log(profileTitleInput.value)

}

let savePopupButton = popup.querySelector('.popup__save-button');

savePopupButton.addEventListener ('click', profileSave);

function profileSave () {

    if (profileTitleInput.value.length > 30) {
        alert('Пожалуйста, используйте более короткое имя') 
    } else {
    profileTitle.textContent = profileTitleInput.value;
    profileSubtitle.textContent = profileSubtitleInput.value;
    closePopup();
    }

}


editProfileButton.addEventListener('click', profileEdit);

let closePopupButton = popup.querySelector('.popup__close-button');

function closePopup () {
  // let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

closePopupButton.addEventListener('click', closePopup)

function closePopupArrond(aria) {
if (!aria.target.closest('.popup__window') ) {
    closePopup();
}
}

popup.addEventListener('click', closePopupArrond);

// let profileTitle = profile.querySelector('.profile__title');


let elementsFavorite = document.querySelectorAll('.element__favorite');

console.log(elementsFavorite);
console.log(elementsFavorite[2]);

let elements = document.querySelector('.elements');

elements.addEventListener('click', eventFunction);

function eventFunction (eventTarget) {
    
    console.log(eventTarget.target);
    eventTarget.target.classList.toggle('element__favorite_active');
}


// popup.addEventListener('keydown', keyEnter);

// function keyEnter(event) {
//     console.log(event.code)
//     if (event.code == 'Enter') profileSave();
// }

popup.addEventListener('keydown', (event) => { 
    if (event.code == 'Enter') {profileSave()} else if (event.code == 'Escape') {closePopup()}});