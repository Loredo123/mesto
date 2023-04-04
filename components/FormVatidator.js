// Создается экспортируемый класс 
export default class FormValidator {
    //конструктор принимает объект настроек и валидируемую форму
    constructor(formElement, options) {
        this._options = options;

        this._formElement = formElement;
    }
    // публичный метод включения валидации
    enableValidation() {
        this._setEventListeners();
    }
    // вызывает методы класса для формы и вешает слушатели на инпуты
    _setEventListeners() {
        this._submitElement = this._formElement.querySelector(this._options.buttonSubmit);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
        this._toggleButtonState()
        this._formElement.addEventListener('reset', () => {
            this._handlerResetForm();
        });
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement);
                this._toggleButtonState();
            })
        })
    }
    // проверяет инпут на валидность
    _checkInput(inputElement) {
        this._isValid = inputElement.validity.valid;
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        if (this._isValid) {
            this._hideError(errorElement);
        } else {
            this._showError(errorElement, inputElement.validationMessage);
        }
    }
    // скрывает элемент ошибки
    _hideError(errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove(this._options.activeInputError);
    }
    // отображает элемент ошибки
    _showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add(this._options.activeInputError);
    }
    // переключатель состояния кнопки сабмита
    _toggleButtonState() {
        const formIsValid = this._inputList.every((inputElement) => inputElement.validity.valid);
        if (formIsValid) {
            this._enableButton();
        } else {
            this._disableButton();
        }
    }
    // активирует кнопку
    _enableButton() {
        this._submitElement.removeAttribute('disabled');
        this._submitElement.classList.remove(this._options.inactiveButtonClass);
    }
    // деактивирует кнопку
    _disableButton() {
        this._submitElement.setAttribute('disabled', 'true');
        this._submitElement.classList.add(this._options.inactiveButtonClass);
    }
    // для проверки формы после нажатия на кнопку сабмита и срабатывания события reset
    _handlerResetForm() {
        setTimeout(() => {
            this._toggleButtonState()
        }, 0);
    }

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._checkInput(inputElement);
        });

    }

    clearErrors() {
        const errors = Array.from(this._formElement.querySelectorAll('.form__error-message'));
        errors.forEach((error) => {
            this._hideError(error);
        })
    }
}

