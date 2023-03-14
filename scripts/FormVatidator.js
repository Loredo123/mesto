// Создается экспортируемый класс 
export default class FormValidator {
    //конструктор принимает объект настроек и валидируемую форму
    constructor(options, formElement) {
        this._options = options;

        this._formElement = formElement;
    }
    // публичный метод включения валидации
    enableValidation() {
        this._setEventListeners();
    }
    // вызывает методы класса для формы и вешает слушатели на инпуты
    _setEventListeners() {
        const submitElement = this._formElement.querySelector(this._options.buttonSubmit);
        const inputs = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
        this._toggleButtonState(inputs, submitElement)
        this._formElement.addEventListener('reset', () => {
            this._handlerResetForm(inputs, submitElement);
        });
        if (this._formElement.name === 'form-edit') {
            this._enableButton(submitElement);
        }
        inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement);
                this._toggleButtonState(inputs, submitElement);
            })
        })
    }
    // проверяет инпут на валидность
    _checkInput(inputElement) {
        const isValid = inputElement.validity.valid;
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        if (isValid) {
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
    _toggleButtonState(inputs, submitElement) {
        const formIsValid = inputs.every((inputElement) => inputElement.validity.valid);
        if (formIsValid) {
            this._enableButton(submitElement);
        } else {
            this._disableButton(submitElement);
        }
    }
    // активирует кнопку
    _enableButton(submitElement) {
        submitElement.removeAttribute('disabled');
        submitElement.classList.remove(this._options.inactiveButtonClass);
    }
    // деактивирует кнопку
    _disableButton(submitElement) {
        submitElement.setAttribute('disabled', 'true');
        submitElement.classList.add(this._options.inactiveButtonClass);
    }
    // для проверки формы после нажатия на кнопку сабмита и срабатывания события reset
    _handlerResetForm(inputs, submitElement) {
        setTimeout(() => {
            this._toggleButtonState(inputs, submitElement)
        }, 0);
    }
}

