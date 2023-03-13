const gallery = document.querySelector('.gallery__grid');
const fullscreenImage = document.querySelector('.popup__image');
const fullscreenImageCaption = document.querySelector('.popup__image-caption');
const popupImage = document.querySelector('.popup_fullscreen-image');

export class Card {
    constructor(name, image, templateSelector) {
        this._name = name;
        this._image = image;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        this._element = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);

        return this._element;
    }

    _createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__place-name').textContent = this._name;
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = `На фото - ${this._name}`;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.card__remove').addEventListener('click', (event) => {
            this._handlerRemoveCard(event);
            console.log('тык');
        });

        this._element.querySelector('.card__like').addEventListener('click', (event) => {
            this._handlerAddLike(event);
        })

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handlerOpenImage();
        })
    }

    _handlerOpenImage() {
        fullscreenImage.src = this._image;
        fullscreenImage.alt = `На фото - ${this._name}`;
        fullscreenImageCaption.textContent = this._name;
        popupImage.classList.add('popup_opened');
        document.addEventListener('keydown', this._handlerCloseKey);
    }

    _handlerCloseKey(event) {
        if (event.key === 'Escape') {
            popupImage.classList.remove('popup_opened');
            document.removeEventListener('keydown', this._handlerCloseKey);
        }
    }

    _handlerAddLike(event) {
        event.target.classList.toggle('card__like_active');
    }

    _handlerRemoveCard(event) {
        console.log(event.target);
        event.target.closest('.gallery__item').remove();
    }

    addCard() {
        gallery.prepend(this._createCard());
    }
}