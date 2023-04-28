import './index.css';
// Импорт модулей

import Api from '../components/Api.js';
import { Card } from '../components/Card.js';
import Validator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { validationsConfig, buttonAddCard, buttonEditProfile, formValidators, nameInput, commentInput, avatar } from '../utils/constants.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js';



//Функция возвращает готовую разметку карточки
function createCard(data, user) {
    const card = new Card(data, '.gallery__template-card', popupImage.open.bind(popupImage), popupConfirm.open.bind(popupConfirm), api);
    return card.createCard(user);

}
//Создание экземпляров классов
//Экземпляр класса Api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
        authorization: '7cefef8e-0cb2-4688-be1f-f9c60ce55cca',
        'Content-Type': 'application/json'
    }
});
//Экземпляр класаа Popup для подтверждения удаления карточки

const popupConfirm = new PopupWithConfirm('.popup_confirm', api);
popupConfirm.setEventListeners();

//Экземпляр класса PopupWithForm для формы смены аватара
const popupAvatar = new PopupWithForm('.popup_avatar', (inputValues) => {
    return api.changeAvatar(inputValues.avatar).then(() => {
        userInfo.setUserInfo(inputValues)
    })
        .catch(error => console.log(error));


});

popupAvatar.setEventListeners();


//Экземпляр класса UserInfo
const userInfo = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__comment', avatarSelector: '.profile__avatar' });
//Экземпляр класса PopupWithForm для добавления карточки
const popupCard = new PopupWithForm('.popup_card', (inputValues) => {
    return api.addCard(inputValues)
        .then((data) => {

            gallerySection.addItem(createCard(data, userId));

        })
        .catch(error => console.log(error));


});
popupCard.setEventListeners();
//Экземпляр класса PopupWithForm для редактирования профиля
const popupProfile = new PopupWithForm('.popup_profile', (inputValues) => {

    return api.editUser(inputValues).then(() => {
        userInfo.setUserInfo(inputValues);
    })
        .catch(error => console.log(error));



});
popupProfile.setEventListeners();
//Экземпляр класса PopupWithImage
const popupImage = new PopupWithImage('.popup_fullscreen-image', '.popup__image', '.popup__image-caption');
popupImage.setEventListeners();

//Экземпляр класса Section
const gallerySection = new Section((item) => {
    gallerySection.addItem(createCard(item, userId));;
}
    , '.gallery__grid', api);


//Слушатели для открытия попапов
function handleClickAvatar() {
    popupAvatar.open();
    formValidators['form-avatar'].clearErrors();

}

function handleSubmitEditForm() {
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    commentInput.value = data.info;
    popupProfile.open();
    formValidators['form-edit'].resetValidation();
}
function handleSubmitAddForm() {
    popupCard.open();
    formValidators['form-add'].clearErrors();
}
avatar.addEventListener('click', handleClickAvatar);
buttonEditProfile.addEventListener('click', handleSubmitEditForm);
buttonAddCard.addEventListener('click', handleSubmitAddForm);




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

///

//Загрузка данных профиля и карточек с сервера

let userId;
Promise.all([api.getUser(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;
        gallerySection.renderItems(cards);


    })
    .catch((err) => console.log(err))












