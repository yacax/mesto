import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImageTitle = this._popup.querySelector('.popup__image-title');
    this._popupImageImage = this._popup.querySelector('.popup__image');
  }
  open(name, link) {
    this._popupImageImage.src = link;
    this._popupImageImage.alt = name;
    this._popupImageTitle.textContent = name;
    super.open();
  };
}

export { PopupWithImage }