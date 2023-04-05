
// экспортируемый класс 
export class Card {
    // конструктор принимает название места, ссылку на картинку и селектор нужного template-элемента
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
        this._handlerCardClick = handleCardClick;
    }
    // возвращает пустой шаблон для карточки
    _getTemplate() {
        this._cardElement = document
            .querySelector(this._templateSelector)
            .content.firstElementChild.cloneNode(true)

        return (this._cardElement);
    }

    // создает и возвращает готовую карточку
    createCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._cardLike = this._element.querySelector('.card__like');
        this._setEventListeners();
        this._element.querySelector('.card__place-name').textContent = this._name;
        this._cardImage.src = this._image;
        this._cardImage.alt = `На фото - ${this._name}`;
        return this._element;
    }
    // вешает на карточку слушатели
    _setEventListeners() {
        this._element.querySelector('.card__remove').addEventListener('click', () => {
            this._handleRemoveCard();

        });

        this._cardLike.addEventListener('click', () => {
            this._handleLikeCard(this._cardLike);
        })

        this._cardImage.addEventListener('click', () => {
            this._handlerCardClick(this._name, this._image);
        })
    }


    // меняет состояние лайка
    _handleLikeCard(buttonLike) {

        buttonLike.classList.toggle('card__like_active');
    }
    // удаляет карточку

    _handleRemoveCard() {
        this._element.remove();
        this._element = null;
    }
}