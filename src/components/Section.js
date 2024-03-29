export default class Section {
    constructor(renderer, containerSelector, api) {
        this._api = api;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.reverse().forEach(element => {
            this._renderer(element);

        })
    }

    addItem(element) {
        this._container.prepend(element);
    }
}