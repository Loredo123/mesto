import { Card } from './Card.js';

const nameInput = document.querySelector('.form__input[name="profile-name"]');
const commentInput = document.querySelector('.form__input[name="profile-comment"]');
const formAddCard = document.querySelector('form[name="form-add"]');
const formEditProfile = document.querySelector('form[name="form-edit"]');
const exitButtons = document.querySelectorAll('.popup__button-exit');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileComment = document.querySelector('.profile__comment');
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupImage = document.querySelector('.popup_fullscreen-image');
const profileButtonSave = document.querySelector('.form__button-save_profile');
const cardButtonSave = document.querySelector('.form__button-save_card');
const addButton = document.querySelector('.profile__add-button');
const placeNameInput = document.querySelector('.form__input[name="place-name"]');
const linkInput = document.querySelector('.form__input[name="place-url"]');
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
//Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeKeyState);
};
//Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeKeyState);
};
//Функция для закрытия модального окна при нажатии на esc
function closeKeyState(event) {
    const currentPopup = document.querySelector('.popup_opened');
    if (event.key === 'Escape') {
        closePopup(currentPopup);
    }
}



//Функция сохраняет данные, введение в форму, в профиль и закрывает модальное окно
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileComment.textContent = commentInput.value;
    closePopup(popupProfile);
}
//Функция создает и добавляет новую карточку на страницу, после чего очищает поля формы и закрывает попап
function handleFormCardSubmit(evt) {
    evt.preventDefault();
    const card = new Card(placeNameInput.value, linkInput.value, '.gallery__template-card');
    card.addCard();
    formAddCard.reset();
    closePopup(popupCard);
}


//Вешаем слушатели событий на формы
formAddCard.addEventListener('submit', handleFormCardSubmit);
formEditProfile.addEventListener('submit', handleFormProfileSubmit);

//Вешаем слушатели на кнопки открытия попапов
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    commentInput.value = profileComment.textContent;
    openPopup(popupProfile);
});
addButton.addEventListener('click', () => {
    openPopup(popupCard);
});


//Для каждого попапа добавляем слушатель, который вызывает closePopup, если клик произошел на кнопке закрытия или на самом попапе
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-exit')) {
            closePopup(evt.currentTarget);
        }
    });
});

//Добавляем на страницу карточки "из коробки"
initialCards.forEach((elem) => {
    const card = new Card(elem.name, elem.link, '.gallery__template-card');
    card.addCard();
});



