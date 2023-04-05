

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);

    }


    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._callBackEscClose);

    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._callBackEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._callBackEscClose = this._handleEscClose.bind(this);
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-exit')) {
                this.close();
            }
        });


    }
}