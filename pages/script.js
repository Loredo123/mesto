// Импорт модулей
import { Card } from '../components/Card.js';
import Validator from '../components/FormVatidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
//объявление необходимых переменных и объектов
const nameInput = document.querySelector('.form__input[name="profile-name"]');
const commentInput = document.querySelector('.form__input[name="profile-comment"]');
// const formAddCard = document.querySelector('form[name="form-add"]');
// const formEditProfile = document.querySelector('form[name="form-edit"]');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileComment = document.querySelector('.profile__comment');
const popups = document.querySelectorAll('.popup');

// const popupCard = document.querySelector('.popup_card');

const addButton = document.querySelector('.profile__add-button');
const placeNameInput = document.querySelector('.form__input[name="place-name"]');
const linkInput = document.querySelector('.form__input[name="place-url"]');
//
const gallery = document.querySelector('.gallery__grid');
const formValidators = {}
export const fullscreenImage = document.querySelector('.popup__image');
export const fullscreenImageCaption = document.querySelector('.popup__image-caption');
// объект селекторов и классов для валидации
const validationsConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    buttonSubmit: '.form__button-save',
    inactiveButtonClass: 'form__button-save_disabled',
    activeInputError: 'form__inpute-error_active'
};
//карточки из коробки
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
const userInfo = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__comment' });
const popupCard = new PopupWithForm('.popup_card', (evt) => {
    evt.preventDefault();
    const card = new Card({ name: placeNameInput.value, link: linkInput.value }, '.gallery__template-card', popupImage.open.bind(popupImage));
    gallerySection.addItem(card.createCard());
    popupCard.close();
});
const popupProfile = new PopupWithForm('.popup_profile', (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(popupProfile.getInputsValue());
    popupProfile.close();
});
const popupImage = new PopupWithImage('.popup_fullscreen-image');
const gallerySection = new Section({
    items: initialCards, renderer: (item) => {
        const card = new Card(item, '.gallery__template-card', popupImage.open.bind(popupImage));

        const cardElement = card.createCard();

        gallerySection.addItem(cardElement);
    }
}, '.gallery__grid');
gallerySection.renderItems();

//Вешаем слушатели для открытия попапов
editButton.addEventListener('click', () => {
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    commentInput.value = data.info;
    popupProfile.open();
    formValidators['form-edit'].resetValidation();
});

addButton.addEventListener('click', () => {
    popupCard.open();
    formValidators['form-add'].clearErrors();
});


// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new Validator(formElement, config);
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name');
        // вот тут в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationsConfig);




