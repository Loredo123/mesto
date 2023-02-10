const formElement = document.querySelectorAll('.popup__container');
const nameInput = document.querySelector('.form__input[name="profile-name"]');
const commentInput = document.querySelector('.form__input[name="profile-comment"]');
const exitButton = document.querySelectorAll('.popup__button-exit');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileComment = document.querySelector('.profile__comment');
const popup = document.querySelectorAll('.popup');
const addButton = document.querySelector('.profile__add-button');
const placeNameInput = document.querySelector('.form__input[name="place-name"]');
const linkInput = document.querySelector('.form__input[name="place-url"]');
const gallery = document.querySelector('.gallery__grid');
const templateCard = document.querySelector('.gallery__template-card');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
//----------------------------------------------------------------------------------
function popupOpen() {
    if (this === editButton) {
        nameInput.value = profileName.textContent;
        commentInput.value = profileComment.textContent;
        popup[0].classList.add('popup_opened');

    }
    if (this === addButton) {
        popup[1].classList.add('popup_opened');
    }

    if (this.classList.value === 'card__image') {
        const templateImage = document.querySelector('.popup__template-image');
        const figure = templateImage.content.cloneNode(true);
        const image = figure.querySelector('.popup__image');
        const caption = figure.querySelector('.popup__image-caption');
        image.src = this.src;
        image.alt = this.alt;
        caption.textContent = this.parentElement.querySelector('.card__place-name').textContent;
        popup[2].append(figure);
        popup[2].classList.add('popup_opened');
        exit = popup[2].querySelector('.popup__button-exit')
        exit.addEventListener('click', () => {
            popup[2].classList.remove('popup_opened');
            popup[2].lastElementChild.remove();
        });
    }
};

function popoupClose() {
    popup[Array.from(exitButton).indexOf(this)].classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    if (this === formElement[0]) {
        profileName.textContent = nameInput.value;
        profileComment.textContent = commentInput.value;

    }
    if (this === formElement[1]) {
        cardAdd(placeNameInput.value, linkInput.value);
    }
    this.parentElement.classList.remove('popup_opened');

};

editButton.addEventListener('click', popupOpen);
addButton.addEventListener('click', popupOpen);
exitButton.forEach((btn) => {
    btn.addEventListener('click', popoupClose)
});

formElement.forEach((el) => {
    el.addEventListener('submit', handleFormSubmit);
});

//-----------------------------------------------------------------

cardAdd = (name, link) => {
    const cardItem = templateCard.content.cloneNode(true);
    const likeItem = cardItem.querySelector('.card__like');
    const trashItem = cardItem.querySelector('.card__remove');
    const imageItem = cardItem.querySelector('.card__image');
    cardItem.querySelector('.card__place-name').textContent = name;
    imageItem.src = link;
    imageItem.alt = `На фото ${name}`;
    // initialCards.push({ name: name, link: link });
    imageItem.addEventListener('click', popupOpen);
    likeClick(likeItem);
    cardRemove(trashItem);
    gallery.prepend(cardItem);
}


initialCards.forEach((elem) => {
    cardAdd(elem.name, elem.link);
});


function likeClick(item) {
    item.addEventListener('click', function () {
        item.classList.toggle('card__like_active');
    })
};


function cardRemove(item) {
    item.addEventListener('click', function () {
        item.parentElement.parentElement.remove();
    })

};
