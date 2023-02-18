class Card {
  constructor(templateSelector, item, openElementImage) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._openElementImage = openElementImage;

    this._deleteElement = this._deleteElement.bind(this);
    this._switchFavorite = this._switchFavorite.bind(this);
  };

  _getElementFromTemplate() {
    const elementTemplate = document
      .querySelector(this._templateSelector)
      .content
      .children[0]
      .cloneNode(true);
    return elementTemplate;
  };

  getElement() {
    this._element = this._getElementFromTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._setEventListeners();
    return this._element;
  };

  _deleteElement() {
    this._element.remove();
  };

  _switchFavorite(event) {
    event.target.classList.toggle('element__favorite_active');
  };

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteElement);
    this._element.querySelector('.element__favorite').addEventListener('click', this._switchFavorite);
    this._element.querySelector('.element__image').addEventListener('click', this._openElementImage);
  };
};

export { Card }

