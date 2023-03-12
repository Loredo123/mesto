class Card {
    constructor(name, link, templateSelector) {
        const _card = templateSelector.content.cloneNode(true);
        const _like = card.querySelector('.card__like');
        const _trash = card.querySelector('card__remove');
        const _image = card.querySelector('card__image');
        const _place = card.querySelector('card__place-name');

        _place.textContent = name;
        _image.src = link;
        _image.alt = `На фото ${name}`;
    }

    add(location, card) {
        location.prepend(card);
    }
}