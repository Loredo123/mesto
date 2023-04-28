import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, isLoading) {
        super(popupSelector);
        this._isLoading = isLoading;
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputsList = Array.from(this._form.querySelectorAll('input'));
        this._submitButton = this._form.querySelector('.form__button-save');
        this._inputsValues = {};
    }

    _getInputValues() {

        this._inputsList.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        })
        return this._inputsValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (e) => {
            e.preventDefault();

            const initialText = this._submitButton.textContent;
            this._submitButton.textContent = 'Сохранение...';
            this._handleFormSubmit(this._getInputValues())
                .then(() => this.close())
                .finally(() => {
                    this._submitButton.textContent = initialText;
                });

        });


    }

    close() {
        super.close();
        this._form.reset();
    }


}