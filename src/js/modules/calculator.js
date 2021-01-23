class Calculator {
    constructor(forms, startStep, tabsSelector, btnTabsSelector, stepControlSelector) {
        //Начальный шаг табов
        this.startStep = startStep;

        this.forms = forms;

        //Объект хранение рещультатов
        let data = this.data = {};

        //Вкладки формы
        let tabs = this.tabs = document.querySelectorAll(tabsSelector);

        //Кнопки переключение Далее-Отправить
        let btnTabs = this.btnTabs = document.querySelector(btnTabsSelector);

        //Контекст вызова
        let glob = this.glob = this;

        //Обертка для точек доступа
        let stepControl = this.stepControl = document.querySelector(stepControlSelector);

        //Добавление точек - контролов
        for (let i = 0; i < tabs.length; i++) {
            this.createDots(stepControl);
        }

        //Точки управления
        let dots = this.dots = document.querySelectorAll('.popup-calculator__step');

        //Отобразить первый таб
        this.showStep(startStep);

        //Переключение точек
        dots.forEach((elem, i) => {
            elem.addEventListener('click', function () {
                glob.showStep(glob.startStep = i + 1);
            });
        });

        //переключение кнопкой Далее
        this.btnTabs.addEventListener('click', function () {

            if (glob.startStep < tabs.length) {
                glob.showStep(glob.startStep += 1);


            } else {

                //Отправка формы
                this.type = 'submit';

                forms.addEventListener('submit', e => glob.sendCalculatorForm(e));
            }
        });

        for (let i = 0; i < tabs.length; i++) {

            //Отлавливаем клик на tabs
            tabs[i].addEventListener('click', function (e) {

                let target = e.target;

                glob.btnTabs.disabled = true;
                glob.btnTabs.classList.remove('popup-calculator__btn_active');

                if (target.tagName === 'INPUT') {
                    this.dataset.tabs = true;
                    glob.checkTabs('[data-place],[data-roller],[data-size]');
                }
            });

        }


    }


    //Создание точек
    createDots(elem) {
        let dot = document.createElement('span');
        dot.classList.add('popup-calculator__step');
        elem.append(dot);
    }

    //Показываем 1 слайд
    showStep(n) {

        if (n > this.dots.length) {
            this.startStep = 1;
        }

        if (n < 1) {
            this.startStep = this.dots.length;
        }

        if (n == this.dots.length) {
            this.btnTabs.innerHTML = 'Узнать цену';
        } else {
            this.btnTabs.innerHTML = 'Далее';
        }


        this.clearActiveClass();
        this.btnTabs.disabled = true;
        this.btnTabs.classList.remove('popup-calculator__btn_active');
        this.tabs[this.startStep - 1].classList.add('popup-calculator__tabs_active');
        this.dots[this.startStep - 1].classList.add('popup-calculator__step_active');
    }

    //Убираем активный класс у элементов ++++
    clearActiveClass() {

        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].classList.remove('popup-calculator__step_active');

            this.tabs[i].classList.remove('popup-calculator__tabs_active');

        }
    }

    //Send Calculator Form
    sendCalculatorForm(e) {

        e.preventDefault();
        //проверка что все этапы формы пройденны
        if (!this.validForm()) return;

        //Очищаем localeStorage
        localStorage.clear();


        //Показываем статус отправки
        let messageBox = document.createElement('div');
        messageBox.classList.add('form__message');

        //AJAX запрос калькулятор

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://https://gipsolit-site.herokuapp.com/calc');

        xhr.setRequestHeader('Content-type', 'application/json; charset = utf-8');
        //Проверка сформированной даты

        xhr.send(JSON.stringify(this.data));

        let form = this.forms;
        let num = this.startStep;

        //передачега внешнего контекста класса
        let globs = this.glob;


        this.forms.append(messageBox);

        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState < 4) {

            } else if (xhr.readyState === 4 && xhr.status === 200) {

                //Ответ от сервера
                let obj = JSON.parse(xhr.response);


                // getResultPopup('popup-result', obj);
                new Popup().showPopup('#popup-result');

                alert(`${obj.place}, ${obj.roller}, ${obj.result.min} // ${obj.result.all}  `);

                //Переключаем на первый слайд
                globs.showStep(num = globs.tabs.length + 1);
                form.removeChild(messageBox);

            } else {
                messageBox.innerText = new SendForm().message.error;
            }
        });
    }

    //END Send Calculator Form

    //Очищаем inputs
    clearChecks(el) {
        let elems = document.querySelectorAll(el);

        elems.forEach((el) => {
            el.checked = false;
        });

    }


    //Проверка табов
    checkTabs(attr) {
        let globs = this;

        let item;
        for (let i = 0; i < attr.split(',').length; i++) {
            item = document.querySelectorAll(attr);

        }

        item.forEach(el => {
            el.addEventListener('change', function () {
                globs.clearChecks(attr);
                el.checked = true;
                for (let key in el.dataset) {
                    if (key !== 'tabs') {
                        globs.data[key] = el.dataset[key];
                    }

                }
                globs.btnTabs.disabled = false;
                globs.btnTabs.classList.add('popup-calculator__btn_active');
                //Результат заносим в localStorage
                localStorage.setItem('obj', JSON.stringify(globs.data));
            });
        });

    }


    //Проверка что все табы успешно пройдены
    validForm() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].dataset.tabs === 'true') {
                return true;
            } else {
                return false;
            }

        }
    }

}
