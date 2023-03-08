const config = {
  selectorElementsList: '.elements',
  selectorElementTemplate: '.element-template',
  selectorPopup: '.popup',
  selectorPopupProfile: '.popup_name_profile',
  selectorPopupElement: '.popup_name_element',
  selectorPopupImage: '.popup_name_image',
  selectorUserName: '.profile__title',
  selectorUserAbout: '.profile__subtitle',
  selectorUserProfile: '.profile',
  selectorProfileEditButton: '.profile__edit-button',
  selectorElementAddButton: '.profile__add-button',
};

const profile = document.querySelector(config.selectorUserProfile);
const addPopupElementButton = profile.querySelector(config.selectorElementAddButton);
const editProfileButton = profile.querySelector(config.selectorProfileEditButton);

export { config, addPopupElementButton, editProfileButton }