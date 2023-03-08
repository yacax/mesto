class Card {
  constructor(templateSelector, item, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._deleteElement = this._deleteElement.bind(this);
    this._switchFavorite = this._switchFavorite.bind(this);

    this._element = this._getElementFromTemplate();
    this._cardName = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardDeleteButton = this._element.querySelector('.element__delete-button')
    this._cardFavoriteButton = this._element.querySelector('.element__favorite');
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
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
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
    this._cardDeleteButton.addEventListener('click', this._deleteElement);
    this._cardFavoriteButton.addEventListener('click', this._switchFavorite);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  };
};

export { Card }