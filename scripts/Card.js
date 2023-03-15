//переменные
export const gallery = document.querySelector('.gallery__grid');
const fullscreenImage = document.querySelector('.popup__image');
// экуспортируемый класс 
export class Card {
    // конструктор принимает название места, ссылку на картинку и селектор нужного template-элемента
    constructor(name, image, templateSelector) {
        this._name = name;
        this._image = image;
        this._templateSelector = templateSelector;
    }
    // возвращает пустой шаблон для карточки
    _getTemplate() {
        this._element = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);

        return this._element;
    }
    // создает и возвращает готовую карточку
    _createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__place-name').textContent = this._name;
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = `На фото - ${this._name}`;

        return this._element;
    }
    // вешает на карточку слушатели
    _setEventListeners() {
        this._element.querySelector('.card__remove').addEventListener('click', (event) => {
            this._handlerRemoveCard(event);

        });

        this._element.querySelector('.card__like').addEventListener('click', (event) => {
            this._handlerLikeState(event);
        })

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handlerOpenImage();
        })
    }
    // для popupImage 
    _handlerOpenImage() {
        fullscreenImage.src = this._image;
        fullscreenImage.alt = `На фото - ${this._name}`;
        fullscreenImageCaption.textContent = this._name;
    }


    // меняет состояние лайка
    _handlerLikeState(event) {
        event.target.classList.toggle('card__like_active');
    }
    // удаляет карточку
    _handlerRemoveCard(event) {
        event.target.closest('.gallery__item').remove();
    }
    // публичный метод, который добавляет карточку на страницу
    addCard() {
        gallery.prepend(this._createCard());
    }
}