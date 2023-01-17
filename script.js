let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name-edit');
let commentInput = formElement.querySelector('.popup__comment-edit');
// кнопка выхода из режима редактирования
let exitButton = formElement.querySelector('.popup__button-exit');
// кнопка редактирования профиля
let editButton = document.querySelector('.profile__edit-button');
// переменная для доступа к тексту поля "Имя"
let profileName = document.querySelector('.profile__name');
// переменная для доступа к тексту поля "о себе"
let profileComment = document.querySelector('.profile__comment');
// переменная для добавление и удаления класса popup_opened
let popup = document.querySelector('.popup');

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileComment.textContent = commentInput.value;
    popup.classList.remove('popup_opened');
}
// кнопка для вызова окна редактирования профиля
editButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    commentInput.value = profileComment.textContent;
    popup.classList.add('popup_opened');
});
// кнопка для закрытия окна редактирования профиля
exitButton.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});
// обработка события отправки формы
formElement.addEventListener('submit', handleFormSubmit); 