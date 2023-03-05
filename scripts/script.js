

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
    addCard(createCard(placeNameInput.value, linkInput.value));
    formAddCard.reset();
    closePopup(popupCard);
}
//Функция для переключения состояния кнопки лайка
function addLikeHandler(event) {
    event.target.classList.toggle('card__like_active');
};
//Функция удаления карточки со страницы
function removeCardHandler(event) {
    event.target.closest('.gallery__item').remove();
};
//Функция создания карточки
function createCard(name, link) {
    const cardItem = templateCard.content.cloneNode(true);
    const likeItem = cardItem.querySelector('.card__like');
    const trashItem = cardItem.querySelector('.card__remove');
    const imageItem = cardItem.querySelector('.card__image');
    const placeName = cardItem.querySelector('.card__place-name');
    placeName.textContent = name;
    imageItem.src = link;
    imageItem.alt = `На фото ${name}`;
    imageItem.addEventListener('click', () => {
        fullscreenImage.src = imageItem.src;
        fullscreenImage.alt = imageItem.alt;
        fullscreenImageCaption.textContent = placeName.textContent;
        openPopup(popupImage)
    });
    likeItem.addEventListener('click', addLikeHandler);
    trashItem.addEventListener('click', removeCardHandler);
    return cardItem;
};
//Функция добавления карточки на страницу
function addCard(card) {
    gallery.prepend(card);
};
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
    addCard(createCard(elem.name, elem.link));
});



