class UserInfo {
  constructor(selectorUserName, selectorUserAbout, selectorUserAvatar) {    
    this._selectorUserName = selectorUserName;
    this._selectorUserAbout = selectorUserAbout;
    this._selectorUserAvatar = selectorUserAvatar;
    this._userName = document.querySelector(this._selectorUserName);
    this._userAbout = document.querySelector(this._selectorUserAbout);
    this._userAvatar = document.querySelector(this._selectorUserAvatar);
  };

  setUserInfo({ name, about, avatar, _id }) {
    this._id = _id;
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
  };

  getUserInfo() {
    return {
      id: this._id,
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src
    };
  };
}

export { UserInfo }