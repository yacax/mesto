// показать попап

let editProfileButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

editProfileButton.addEventListener('click', () => popup.classList.add('popup_opened'));

// добавить текст со страницы в попап

let profile = document.querySelector('.profile');

let profileTitleInput = popup.querySelector('.popup__profile-title-input')
let profileTitle = profile.querySelector('.profile__title');

profileTitleInput.value = profileTitle.textContent;

let profileSubtitleInput = popup.querySelector('.popup__profile-subtitle-input')
let profileSubtitle = profile.querySelector('.profile__subtitle');

profileSubtitleInput.value = profileSubtitle.textContent;

// кнопка сохранить

let savePopupButton = popup.querySelector('.popup__save-button');
savePopupButton.addEventListener('click', profileSave);

function profileSave() {

    if (profileTitleInput.value.length > 30) {
        alert('Пожалуйста, используйте более короткое имя')
    } else {
        profileTitle.textContent = profileTitleInput.value;
        profileSubtitle.textContent = profileSubtitleInput.value;
        closePopup();
    }
}

// закрыть без изменений

let closePopupButton = popup.querySelector('.popup__close-button');

function closePopup() {
    popup.classList.remove('popup_opened');
}

closePopupButton.addEventListener('click', closePopup)

function closePopupArrond(aria) {
    if (!aria.target.closest('.popup__window')) {
        closePopup();
    }
}

popup.addEventListener('click', closePopupArrond);

// закрыть с клавы

popup.addEventListener('keydown', (event) => {
    if (event.code == 'Enter') { profileSave() } else if (event.code == 'Escape') { closePopup() }
});

// избранное

let elements = document.querySelector('.elements');

elements.addEventListener('click', (eventTarget) => {
    if (eventTarget.target.classList.contains('element__favorite')) { eventTarget.target.classList.toggle('element__favorite_active') }
});



// Находим форму в DOM
let formElement = document.querySelector('.profile__info');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.profile__title');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.profile__subtitle');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
//реализовано выше
    // Получите значение полей jobInput и nameInput из свойства value
//реализовано выше
    // Выберите элементы, куда должны быть вставлены значения полей
//реализовано выше
    // Вставьте новые значения с помощью textContent
//реализовано выше
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 