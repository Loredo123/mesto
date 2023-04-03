
// экуспортируемый класс 
export class Card {
    // конструктор принимает название места, ссылку на картинку и селектор нужного template-элемента
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._image = data.image;
        this._templateSelector = templateSelector;
        this._handlerCardClick = handleCardClick;
    }
    // возвращает пустой шаблон для карточки
    _getTemplate() {
        this._cardElement = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);

        return this._cardElement;
    }

    // создает и возвращает готовую карточку
    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._cardImage = this._element.querySelector('.card__image');
        this._element.querySelector('.card__place-name').textContent = this._name;
        this._cardImage.src = this._image;
        this._cardImage.alt = `На фото - ${this._name}`;
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
            this._handlerCardClick(this._name, this._image);
        })
    }


    // меняет состояние лайка
    _handlerLikeState(event) {
        event.target.classList.toggle('card__like_active');
    }
    // удаляет карточку
    // this._element является documentFragment'ом и у него нету метода remove()
    _handlerRemoveCard(event) {
        event.target.closest('.gallery__item').remove();
    }
}