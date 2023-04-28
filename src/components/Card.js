
// экспортируемый класс 
export class Card {
    // конструктор принимает название места, ссылку на картинку и селектор нужного template-элемента
    constructor(data, templateSelector, handleCardClick, handleTrashClick, api) {
        this._name = data.name;
        this._image = data.link;
        this._likes = data.likes;
        this._owner = data.owner;
        this._id = data._id;
        this._templateSelector = templateSelector;
        this._handlerCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._api = api;
    }
    // возвращает пустой шаблон для карточки
    _getTemplate() {
        this._cardElement = document
            .querySelector(this._templateSelector)
            .content.firstElementChild.cloneNode(true)

        return (this._cardElement);
    }

    // создает и возвращает готовую карточку
    createCard(userId) {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._cardLike = this._element.querySelector('.card__like');
        this._likeCount = this._element.querySelector('.card__counter');
        this._trash = this._element.querySelector('.card__remove');
        this._setEventListeners();
        this._element.querySelector('.card__place-name').textContent = this._name;
        this._cardImage.src = this._image;
        this._cardImage.alt = `На фото - ${this._name}`;
        this._likeCount.textContent = this._likes.length;
        this._likes.forEach(element => {
            if (element._id === userId) {
                this._cardLike.classList.add('card__like_active');
            }
        });
        if (userId != this._owner._id) {
            this._trash.style.display = 'none';
        }
        return this._element;
    }
    // вешает на карточку слушатели
    _setEventListeners() {
        this._trash.addEventListener('click', () => {

            this._handleTrashClick(this._id, this._element);
        });

        this._cardLike.addEventListener('click', () => {
            this._handleLikeCard();
        })

        this._cardImage.addEventListener('click', () => {
            this._handlerCardClick(this._name, this._image);
        })
    }

    _isActive() {
        return this._cardLike.classList.contains('card__like_active');
    }


    // меняет состояние лайка
    _handleLikeCard() {
        if (this._isActive()) {
            this._api.deleteLike(this._id)

                .then((data) => {
                    this._likeCount.textContent = data.likes.length
                    this._cardLike.classList.toggle('card__like_active');
                });

        } else this._api.addLike(this._id)

            .then((data) => {
                this._likeCount.textContent = data.likes.length;
                this._cardLike.classList.toggle('card__like_active');
            });


    }


}