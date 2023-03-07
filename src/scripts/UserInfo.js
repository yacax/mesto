class UserInfo {
  constructor(selectorUserName, selectorUserAbout) {
    this._selectorUserName = selectorUserName;
    this._selectorUserAbout = selectorUserAbout;
    this._userName = document.querySelector(this._selectorUserName);
    this._userAbout = document.querySelector(this._selectorUserAbout);
  }

  getUserInfo() {
    const user = {}
    // user[this._selectorUserName] = this._userName.textContent;
    // user[this._selectorUserAbout] = this._userAbout.textContent;
    user.name = this._userName.textContent;
    user.about = this._userAbout.textContent;
    return user;
  }

  setUserInfo(newName, newAbout) {
    this._userName.textContent = newName;
    this._userAbout.textContent = newAbout;
  }
}

export { UserInfo }