class SendForm {
    constructor() {
        //Уведомление количество символов в textarea
        let info = this.info = document.createElement('div');
        info.classList.add('info');

        //Статус AJAX запроса
        let message = this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            error: 'Что-то пошло не так',
            phone: 'Введите телефон!'
        };
    }

    //Обработка форм
    processForm(form) {

        //Обход всех элементов формы
        for (let i = 0; i < form.elements.length; i++) {

            if (form.elements[i].type !== 'submit') {
                form.elements[i].setAttribute('required', 'required');

                form.elements[i].addEventListener('blur', e => new Validation().formValidate(e));
            }
        }

        if (form.elements.message) {
            //Показать количество символов в сообщении
            form.elements.message.addEventListener('input', e => this.textAreaEdit(e));
        }


        //Отправка формы на сервер
        form.addEventListener('submit', e => this.sendForm(e));
    }

    //END Обработка форм

    //Отправка формы на сервер AJAX
    sendForm(e) {

        const el = e.target;
        const {elements} = el;
        //отобразить статус запроса
        const msg = this.message;

        event.preventDefault();
        //Описание состояния AJAX запроса


        let messageBox = document.createElement('div');
        messageBox.classList.add('form__message');

        //Формируем данные для сервера
        let data = {};

        //Перебор элементов формы
        for (let i in elements) {

            //Проверка наличия свойств
            if (elements.hasOwnProperty(i)) {
                if (elements[i].name) {
                    //Формируем объект с данными
                    data[elements[i].name] = elements[i].value;
                }
            }
        }

        //AJAX запрос
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://gipsolit-site.herokuapp.com/clients');

        xhr.setRequestHeader('Content-type', 'application/json; charset = utf-8');

        //Отправка данных на сервер
        xhr.send(JSON.stringify(data));

        //сообщение со статусом операции
        el.append(messageBox);


        let form = el;

        //проверяем состояние запроса
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState < 4) {
                messageBox.textContent = msg.loading;
            } else if (xhr.readyState === 4 && xhr.status === 200) {
                //благодарим пользователя
                new Popup().showPopup('#popup-thanks');
                form.removeChild(messageBox);
            } else {
                messageBox.textContent = msg.error;
            }
        });

        //Очищаем поля формы
        this.clearInputs(el);
    }

    //END Отправка формы на сервер AJAX

    //Очищаем поля формы
    clearInputs(form) {
        for (let i = 0; i < form.elements.length; i++) {
            form.elements[i].value = '';
            form.elements[i].style.border = '1px solid #dddddd';
        }
    }

    //END Очищаем поля формы

    //TextAreaEdit
    textAreaEdit(e) {
        const el = e.target;
        const {value} = el;

        //Количество символов в textarea
        let num = 50;

        if (value.length <= num) {
            el.maxLength = num;

            //Подсказка, количество символов в сообщении
            this.info.innerText = `Осталось символов ${num - value.length}`;
            el.parentNode.append(this.info);
        }
    }

    //END TextAreaEdit

}
