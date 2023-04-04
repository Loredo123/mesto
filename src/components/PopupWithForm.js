import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
    }

    getInputsValue() {
        const inputsList = Array.from(this._form.querySelectorAll('input'));
        const inputsValues = {};
        inputsList.forEach((input) => {
            inputsValues[input.getAttribute('name')] = input.value;
        })
        return inputsValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._handleFormSubmit);

    }

    close() {
        super.close();
        this._form.reset();
    }


}