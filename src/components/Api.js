export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._profile = options.profile;

    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject((err) => console.log(err.status));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })


    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject((err) => console.log(err));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    editUser(user) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: user.name,
                about: user.about
            })
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }
    changeAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: {
                avatar: avatar
            }
        })
    }

    addCard(card) {
        fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })

            .catch((error) => console.log(error))
    }
}


