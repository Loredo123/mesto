export default class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._infoElement = document.querySelector(infoSelector);

    }

    getUserInfo() {
        return { name: this._nameElement.textContent, info: this._infoElement.textContent };
    }


    setUserInfo(data) {
        this._nameElement.textContent = data['profile-name'];
        this._infoElement.textContent = data['profile-comment'];
    }
}