// Импорт модулей
import { Card } from '../components/Card.js';
import Validator from '../components/FormVatidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, validationsConfig, editButton, addButton, formValidators, placeNameInput, linkInput, nameInput, commentInput } from '../utils/constants.js'

//создание экземпляров классов
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
//отрисовка карточек из коробки
gallerySection.renderItems();

//слушатели для открытия попапов
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




