function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        };
    })
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    });
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileComment.textContent = commentInput.value;
    closePopup(popupProfile);
}

function handleFormCardSubmit(evt) {
    evt.preventDefault();
    addCard(createCard(placeNameInput.value, linkInput.value));
    placeNameInput.value = '';
    linkInput.value = '';
    closePopup(popupCard);
}

function addLikeHandler(event) {
    event.target.classList.toggle('card__like_active');
};

function removeCardHandler(event) {
    event.target.closest('.gallery__item').remove();
};

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

function addCard(card) {
    gallery.prepend(card);
};

cardButtonSave.addEventListener('click', handleFormCardSubmit);
profileButtonSave.addEventListener('click', handleFormProfileSubmit);

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    commentInput.value = profileComment.textContent;
    openPopup(popupProfile);
});
addButton.addEventListener('click', () => {
    openPopup(popupCard);
});

exitButtons.forEach((btn) => {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach((elem) => {
    addCard(createCard(elem.name, elem.link));
});



