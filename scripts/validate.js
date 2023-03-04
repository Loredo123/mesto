// Отображает сообщение с ошибкой
const showError = (errorElement, message) => {
    errorElement.textContent = message;
    errorElement.classList.add(options.activeInputError);
};
// Скрывает сообщение с ошибкой
const hideError = (errorElement) => {
    errorElement.textContent = '';
    errorElement.classList.remove(options.activeInputError);
}
// Проверяет инпут на валидность и вызывает showError / hideError для соответсвующего спана
const checkInput = (inputElement) => {
    const isValid = inputElement.validity.valid;
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    if (isValid) {
        hideError(errorElement);
    } else {
        showError(errorElement, inputElement.validationMessage);
    }
}
//Делает кнопку активной
const enableButton = (buttonElement) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(options.inactiveButtonClass);
};
//Делает кнопку неактивной 
const disableButton = (buttonElement) => {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add(options.inactiveButtonClass);
};
//Проверяет на валидность все инпуты формы и по итогу назначает состояние кнопке
const toggleButtonState = (inputs, submitElement) => {
    const formIsValid = inputs.every((inputElement) => inputElement.validity.valid);
    if (formIsValid) {
        enableButton(submitElement);
    } else {
        disableButton(submitElement);
    }
}
//Вешает слушатели на каждый инпут формы, чтобы при каждом вводе срабатывали функции проверки 
//на валидность и переключения состояния кнопки
const setEventListeners = (form) => {
    const submitElement = form.querySelector(options.buttonSubmit);
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));
    toggleButtonState(inputs, submitElement);
    if (form.name === 'form-edit') {
        enableButton(submitElement);
    }
    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInput(inputElement);
            toggleButtonState(inputs, submitElement);
        })
    })
}
//Функция включения валидации. Применяет к каждой форме на странице функцию setEventListeners
const enableValidation = (options) => {
    const forms = Array.from(document.querySelectorAll(options.formSelector));
    forms.forEach((form) => {
        setEventListeners(form);
    });
}

// Объект с необходимыми классами
const options = {
    formSelector: '.form',
    inputSelector: '.form__input',
    buttonSubmit: '.form__button-save',
    inactiveButtonClass: 'form__button-save_disabled',
    activeInputError: 'form__inpute-error_active'
};
//Включение валидации
enableValidation(options);






