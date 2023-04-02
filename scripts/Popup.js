import { popupCard } from './script.js'

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');

        document.addEventListener('keydown', this._handleEscClose);

    }
    close() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            popupCard.close();
        }
    }

    setEventListeners() {

        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-exit')) {
                this.close();
            }
        });


    }
}