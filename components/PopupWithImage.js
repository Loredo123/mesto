import Popup from './Popup.js';

import { fullscreenImage, fullscreenImageCaption } from '../pages/script.js'

export default class PopupWithImage extends Popup {


    open(name, image) {
        super.open();
        fullscreenImage.src = image;
        fullscreenImageCaption.textContent = name;
    }



}