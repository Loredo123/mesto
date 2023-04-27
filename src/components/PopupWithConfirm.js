import Popup from "./Popup";


export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, api, renderCards) {
        super(popupSelector);
        this._render = renderCards;
        this._api = api;
        this._id;
        this._button = this._popup.querySelector('.button');

    }


    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', (e) => {
            this._confirm(this._id);

        })
    }

    open(cardId) {
        super.open();
        this._id = cardId;

    }

    _confirm(id) {
        this._api.deleteCard(id)
            .then(() => {

                this._render();
                this.close();
            })

    }


}