class UserInfo {
  constructor(selectorUserName, selectorUserAbout, selectorUserAvatar) {
    this._selectorUserName = selectorUserName;
    this._selectorUserAbout = selectorUserAbout;
    this._selectorUserAvatar = selectorUserAvatar;
    this._userName = document.querySelector(this._selectorUserName);
    this._userAbout = document.querySelector(this._selectorUserAbout);
    this._userAvatar = document.querySelector(this._selectorUserAvatar);
  }

  getUserInfo() {
    const user = {};
    user.name = this._userName.textContent;
    user.about = this._userAbout.textContent;
    user.avatar = this._userAvatar.src;
    return user;
  }

  setUserInfo(newName, newAbout, newAvatar) {
    this._userName.textContent = newName;
    this._userAbout.textContent = newAbout;
    this._userAvatar.src = newAvatar;
  }

  setAvatar(newLink) {
    this._userAvatar.src = newLink;
  }

}

export { UserInfo }