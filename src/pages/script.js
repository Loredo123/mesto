import './index.css';
// Импорт модулей
import { Card } from '../components/Card.js';
import Validator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, validationsConfig, buttonAddCard, buttonEditProfile, formValidators, nameInput, commentInput } from '../utils/constants.js'


function createCard(data) {
    const card = new Card(data, '.gallery__template-card', popupImage.open.bind(popupImage));
    return card.createCard();
}
//создание экземпляров классов
const userInfo = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__comment' });
const popupCard = new PopupWithForm('.popup_card', (inputValues) => {
    gallerySection.addItem(createCard(inputValues));
    popupCard.close();
});
popupCard.setEventListeners();

const popupProfile = new PopupWithForm('.popup_profile', (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupProfile.close();
});
popupProfile.setEventListeners();

const popupImage = new PopupWithImage('.popup_fullscreen-image', '.popup__image', '.popup__image-caption');
popupImage.setEventListeners();

const gallerySection = new Section({
    items: initialCards, renderer: (item) => {
        gallerySection.addItem(createCard(item));;
    }
}, '.gallery__grid');
//отрисовка карточек из коробки
gallerySection.renderItems();

//слушатели для открытия попапов


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




