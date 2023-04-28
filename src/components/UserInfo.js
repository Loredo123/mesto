

export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._infoElement = document.querySelector(infoSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return { name: this._nameElement.textContent, info: this._infoElement.textContent };
    }


    setUserInfo(data) {
        if (data.name && data.about) {
            this._nameElement.textContent = data.name;
            this._infoElement.textContent = data.about;
        }
        if (data.avatar) {
            this._avatarElement.src = data.avatar;
        }

    }
}