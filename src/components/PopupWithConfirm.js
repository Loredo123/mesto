import Popup from "./Popup";


export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, api) {
        super(popupSelector);

        this._api = api;
        this._id;
        this._card;
        this._button = this._popup.querySelector('.button');

    }


    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', (e) => {
            this._confirm(this._id, this._card);

        })
    }

    open(cardId, cardElement) {
        super.open();
        this._card = cardElement;
        this._id = cardId;

    }

    _confirm(id, card) {
        this._api.deleteCard(id)
            .then(() => {
                card.remove();
                this.close();
            })

    }


}