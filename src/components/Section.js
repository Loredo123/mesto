export default class Section {
    constructor(renderer, containerSelector) {

        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        //reverse для отображения сначала более "свежих карточек"
        items.reverse().forEach(element => {
            this._renderer(element);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}