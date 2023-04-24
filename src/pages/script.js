import './index.css';
// Импорт модулей
import Api from '../components/Api.js';
import { Card } from '../components/Card.js';
import Validator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { profile, initialCards, validationsConfig, buttonAddCard, buttonEditProfile, formValidators, nameInput, commentInput, avatar } from '../utils/constants.js'



//Функция возвращает готовую разметку карточки
function createCard(data) {
    const card = new Card(data, '.gallery__template-card', popupImage.open.bind(popupImage));
    return card.createCard();
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
//Экземпляр класса UserInfo
const userInfo = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__comment' });
//Экземпляр класса PopupWithForm для добавления карточки
const popupCard = new PopupWithForm('.popup_card', (inputValues) => {
    api.addCard(inputValues);
    gallerySection.addItem(createCard(inputValues));
    popupCard.close();
});
popupCard.setEventListeners();
//Экземпляр класса PopupWithForm для редактирования профиля
const popupProfile = new PopupWithForm('.popup_profile', (inputValues) => {
    api.editUser(inputValues);
    userInfo.setUserInfo(inputValues);
    popupProfile.close();
});
popupProfile.setEventListeners();
//Экземпляр класса PopupWithImage
const popupImage = new PopupWithImage('.popup_fullscreen-image', '.popup__image', '.popup__image-caption');
popupImage.setEventListeners();

//Экземпляр класса Section
const gallerySection = new Section((item) => {
    gallerySection.addItem(createCard(item));;
}
    , '.gallery__grid');


//Слушатели для открытия попапов


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

//Загрузка данных профиля с сервера
api.getUser().then((user) => {
    avatar.src = user.avatar;
    userInfo.setUserInfo(user);
});

//Загрузка карточек с сервера
api.getInitialCards().then((cards) => {
    gallerySection.renderItems(cards);

})








