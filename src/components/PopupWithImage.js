import Popup from './Popup.js';

import { fullscreenImage, fullscreenImageCaption } from '../utils/constants.js'

export default class PopupWithImage extends Popup {


    open(name, image) {
        super.open();
        fullscreenImage.src = image;
        fullscreenImageCaption.textContent = name;
    }



}