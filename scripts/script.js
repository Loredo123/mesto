let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.form__input[name="profile-name"]');
let commentInput = formElement.querySelector('.form__input[name="profile-comment"]');
let exitButton = formElement.querySelector('.popup__button-exit');
let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileComment = document.querySelector('.profile__comment');
let popup = document.querySelector('.popup');

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileComment.textContent = commentInput.value;
    popup.classList.remove('popup_opened');
}

function popupOpen() {
    nameInput.value = profileName.textContent;
    commentInput.value = profileComment.textContent;
    popup.classList.add('popup_opened');
}

function popoupClose() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);

exitButton.addEventListener('click', popoupClose);

formElement.addEventListener('submit', handleFormSubmit);

