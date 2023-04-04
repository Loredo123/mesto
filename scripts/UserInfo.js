class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._name = document.querySelector(nameSelector).textContent;
        this._info = document.querySelector(infoSelector).textContent;
    }

    getUserInfo() {
        return { name: this._name, info: this._info };
    }


    setUserInfo() {

    }
}