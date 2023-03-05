// Отображает сообщение с ошибкой
const showError = (errorElement, message, options) => {
    errorElement.textContent = message;
    errorElement.classList.add(options.activeInputError);
};
// Скрывает сообщение с ошибкой
const hideError = (errorElement, options) => {
    errorElement.textContent = '';
    errorElement.classList.remove(options.activeInputError);
}
// Проверяет инпут на валидность и вызывает showError / hideError для соответсвующего спана
const checkInput = (inputElement, options) => {
    const isValid = inputElement.validity.valid;
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    if (isValid) {
        hideError(errorElement, options);
    } else {
        showError(errorElement, inputElement.validationMessage, options);
    }
}
//Делает кнопку активной
const enableButton = (buttonElement, options) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(options.inactiveButtonClass);
};
//Делает кнопку неактивной 
const disableButton = (buttonElement, options) => {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add(options.inactiveButtonClass);
};
//Проверяет на валидность все инпуты формы и по итогу назначает состояние кнопке
const toggleButtonState = (inputs, submitElement, options) => {
    const formIsValid = inputs.every((inputElement) => inputElement.validity.valid);
    if (formIsValid) {
        enableButton(submitElement, options);
    } else {
        disableButton(submitElement, options);
    }
}
//Вешает слушатели на каждый инпут формы, чтобы при каждом вводе срабатывали функции проверки 
//на валидность и переключения состояния кнопки
const setEventListeners = (form, options) => {
    const submitElement = form.querySelector(options.buttonSubmit);
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));
    toggleButtonState(inputs, submitElement, options)

    form.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(inputs, submitElement, options)
        }, 0);
    });

    if (form.name === 'form-edit') {
        enableButton(submitElement, options);
    }
    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInput(inputElement, options);
            toggleButtonState(inputs, submitElement, options);
        })
    })
}
//Функция включения валидации. Применяет к каждой форме на странице функцию setEventListeners
const enableValidation = (options) => {
    const forms = Array.from(document.querySelectorAll(options.formSelector));
    forms.forEach((form) => {
        setEventListeners(form, options);
    });
}

// Объект с необходимыми классами
const validationsConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    buttonSubmit: '.form__button-save',
    inactiveButtonClass: 'form__button-save_disabled',
    activeInputError: 'form__inpute-error_active'
};
//Включение валидации
enableValidation(validationsConfig);






