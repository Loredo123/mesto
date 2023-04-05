import Popup from './Popup.js';



export default class PopupWithImage extends Popup {
    constructor(popupSelector, imageSelector, nameSelector) {
        super(popupSelector);
        this._image = document.querySelector(imageSelector);
        this._name = document.querySelector(nameSelector);
    }

    open(name, image) {
        super.open();
        this._image.src = image;
        this._image.alt = `На фото - ${name}`;
        this._name.textContent = name;

    }



}