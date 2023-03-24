class Card {
  constructor(templateSelector, item, handleCardClick, openPopupConfirmDeleteElement, user, api) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes.length;
    this._item = item;
    this._id = item._id;
    this._api = api;
    this._cardOwner = item.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupConfirmDeleteElement = openPopupConfirmDeleteElement;
    this._user = user;
    this._switchFavorite = this._switchFavorite.bind(this);
    this.getElement = this.getElement.bind(this);
    this._element = this._getElementFromTemplate();
    this._cardName = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardDeleteButton = this._element.querySelector('.element__delete-button')
    this._cardFavoriteButton = this._element.querySelector('.element__favorite');
    this._cardLikesNumber = this._element.querySelector('.element__likes');
  };

  _hideDeleteButton() {
    this._cardDeleteButton.style.display = 'none';
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
    this._cardLikesNumber.textContent = this._likes;
    this._setEventListeners();
    if (this._cardOwner !== this._user) this._hideDeleteButton();
    if (this._isLikedMe()) this._showMyLike();
    return this._element;
  };

  _isLikedMe() {
    return this._item.likes.some(obj => obj._id === this._user)
  };

  _showMyLike() {
    this._cardFavoriteButton.classList.add('element__favorite_active')
  }

  _hideMyLike() {
    this._cardFavoriteButton.classList.remove('element__favorite_active');
  }

  _switchFavorite() {
    const isLiked = this._isLikedMe();
    this._api.toggleLike(this._id, !isLiked)
      .then((res) => {
        this._item.likes = res.likes;
        this._cardLikesNumber.textContent = res.likes.length;
        isLiked ? this._hideMyLike() : this._showMyLike();
      })
      .catch((err) => console.log(err));
  };

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', () => this._openPopupConfirmDeleteElement(this._id, this._element));
    this._cardFavoriteButton.addEventListener('click', this._switchFavorite);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  };
};

export { Card }