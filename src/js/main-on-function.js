document.addEventListener('DOMContentLoaded', function() {

    /*Scroll to Top*/

    let btnTop = document.querySelector('.button_up');

    btnTop.addEventListener('click', function () {
        window.scroll(0, 0);
    });

    window.addEventListener('scroll', showBtn);

    function showBtn() {

        if (window.pageYOffset > document.documentElement.clientHeight) {
            btnTop.style.display = 'block';
        } else {
            btnTop.style.display = 'none';
        }
    }

    /*END Scroll to Top*/


    /*POPUP*/

    let btnHelp = document.querySelector('#help');
    let btnCalc = document.querySelector('.price-header__calc');

    //Заказать товар
    let btnOrder = document.querySelectorAll('.price-block__btn').forEach(elem => {
        elem.addEventListener('click', () => showPopup('#popup-call'));
    });

    //Popup Table - upsell

    let btnUpsell = document.querySelectorAll('.upsell-block__btn').forEach(elem => {
        elem.addEventListener('click', () => showPopup('#popup-upsell'));
    });


    //Получить консультацию
    btnHelp.addEventListener('click',() => showPopup('#popup-call'));

    //Calculator
    btnCalc.addEventListener('click',() => showPopup('#popup-payment', false));



    //Проверка наличие куки
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function showPopup(selector, closeOverley = true) {

        let date = new Date();
        date = new Date(date.setDate(date.getDate() + 1));

        let popup = document.querySelectorAll('.popup');
        popup.forEach(elem => {
           elem.style.visibility = 'hidden';
        });

        let modal = document.querySelector(selector);
        modal.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';

        window.addEventListener('click', function(event) {
            if(event.target === modal && closeOverley) {
                modal.style.visibility = 'hidden';
                document.body.style.overflow = '';
            }
        });

        document.cookie = `${decodeURI('popup')} = ${decodeURI(true)}; expires = ${date}; path = /`;
        closePopup(modal);
    }

    function closePopup(modal) {
        let  modalClose = modal.querySelector('.popup-content__close');
        modalClose.addEventListener('click', function(){
            modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
        });

    }

    if(getCookie('popup') === undefined) {
        setTimeout(() => showPopup('#popup-call'), 5000);
    }

    /*END POPUP*/

    /*NAVIGATION*/

    let navBtn = document.querySelector('.navigation-btn'),
        navBlock = document.querySelector('.navigation-block'),
        navSection = document.querySelector('.navigation');

    navBtn.addEventListener('click', function() {
       this.classList.toggle('navigation-btn__active');
       navBlock.classList.toggle('navigation-block__active');
       navSection.classList.toggle('navigation__active');
    });

    navSection.addEventListener('click', function(event){
        let target = event.target;
        if(target.classList.contains('navigation-block__link') || target.classList.contains('navigation__active')){
            navBlock.classList.remove('navigation-block__active');
            navSection.classList.remove('navigation__active');
            navBtn.classList.remove('navigation-btn__active');
        }

    });

    /*END NAVIGATION*/


    /*SEND FORMS*/

    //Статус AJAX запроса
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        error: 'Что-то пошло не так',
        phone: 'Введите телефон!'
    };

    //Подсказка
    let info = document.createElement('div');
    info.classList.add('info');




    //Формы на сайте
    let mainForm = document.forms.headerForms;
    let feedbackForm = document.forms.feedbackForm;
    let tourForm = document.forms.tourForm;
    let contactsForm = document.forms.contactsForm;
    let popupForm = document.forms.popupForm;
    let paymentForm = document.forms.paymentForm;

    //Обработка форм
    processForm(mainForm);
    processForm(feedbackForm);
    processForm(tourForm);
    processForm(contactsForm);
    processForm(popupForm);
    processForm(paymentForm);



    //Обработка форм
    function processForm(form) {

        //Обход всех элементов формы
        for (let i = 0; i < form.elements.length; i++) {
            if(form.elements[i].type !== 'submit'){
                form.elements[i].setAttribute('required', 'required');
                form.elements[i].addEventListener('blur', formValidate);
            }
        }

        if(form.elements.message) {
            //Показать количество символов в сообщении
            form.elements.message.addEventListener('input', textAreaEdit);
        }


        //Отправка формы на сервер
        form.addEventListener('submit', sendForm);
    }

    //END Обработка форм

    //Отправка формы на сервер AJAX
    function sendForm() {
        event.preventDefault();
    //Описание состояния AJAX запроса

        let messageBox = document.createElement('div');
        messageBox.classList.add('form__message');
        //Ответ пользователю

        let data = {};

        //Перебор элементов формы
        for(let i in this.elements){

            //Проверка наличия свойств
            if(this.elements.hasOwnProperty(i)){
                if( this.elements[i].name){
                    //Формируем объект с данными
                    data[this.elements[i].name] = this.elements[i].value;
                }
            }
        }

        //AJAX запрос
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3010/clients');

        xhr.setRequestHeader('Content-type', 'application/json; charset = utf-8');
        //Проверка сформированной даты

        xhr.send(JSON.stringify(data));

        this.append(messageBox);

        let form = this;

        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState < 4) {
                messageBox.textContent = message.loading;
            } else if (xhr.readyState === 4 && xhr.status === 200) {

                showPopup('#popup-thanks');
                form.removeChild(messageBox);
            } else {
                messageBox.textContent = message.error;
            }
        });


        //Очищаем поля формы
        clearInputs(this);
    }

    //END Отправка формы на сервер AJAX


    //Validation Form
    function formValidate() {

        let names = this.name;
        let check;
        switch (names) {
            case 'name':
                check = /^[А-Яа-яЁёA-Za-z]{3,11}$/.test(this.value);
                break;

            case 'email':
                check = /^[a-zA-Z._-]+\d*@[a-z]+?\.[a-z]{2,3}$/.test(this.value);
                break;

            case 'phone':
                check = validatePhone(this.value);
                break;

            //Необязательное поле, может оставаться пустым
            case 'message':
                check = true;
                break;

            default:
                check = false;
        }

        //Проверка валидации
        if (check) {
            this.style.border = '2px solid green';

        } else {
            this.style.border = '2px solid red';
            this.value = '';
        }
    }

    //END Validation Form

    //Очищаем поля формы
    function clearInputs(form) {
        for(let i = 0; i < form.elements.length; i++) {
            form.elements[i].value = '';
            form.elements[i].style.border = '1px solid #dddddd';
        }
    }
    //END Очищаем поля формы

    //TextAreaEdit
    function textAreaEdit() {
        //Количество символов в textarea
        let num = 50;
        if (this.value.length <= num) {
            this.maxLength = num;
            //console.log(this.value);
            //console.log(this.value.length);
            //console.log(`Осталось символов ${num - this.value.length}`);

            //Подсказка количество символов в сообщении
            info.innerText = `Осталось символов ${num - this.value.length}`;
            this.parentNode.append(info);
        }
    }

    //END TextAreaEdit

    //Phone Validation
    function validatePhone(val) {

        let massCode = [67, 96, 97, 98, 50, 66, 95, 99, 63, 73, 93, 91, 92, 94];

        let resCode = massCode.map(function (i) {
            return '0' + i;
        });

        let str = resCode.join('|');

        let reg = new RegExp("/\\+38\\(" + str + "\\)\\-(\d{3})\\-(\d{2})\\-(\d{2})/");

        if (reg.test(val)) {
            return true;
        } else {
            return false;
        }
    }

    //END Phone Validation


    /*END SEND FORMS*/


    /*Calculator Multiform*/

    let startStep = 1;

    let multiform = document.forms.calcForm;


    let tabs = document.querySelectorAll('.popup-calculator__tabs');

    let btnTabs = document.querySelector('.popup-calculator__btn');

    let stepControl = document.querySelector('.popup-calculator__controls');


    //Добавление точек - контролов
    for(let i = 0; i < tabs.length; i++) {
        createDots(stepControl);
    }

    //Создание точек
    function createDots(elem) {
        let dot = document.createElement('span');
        dot.classList.add('popup-calculator__step');
        elem.append(dot);
    }

    let dots = document.querySelectorAll('.popup-calculator__step');

    showStep(startStep);

    //Показываем 1 слайд
    function showStep(n) {

        if(n > dots.length) {
            startStep = 1;
        }

        if(n < 1) {
            startStep = dots.length;
        }

        if(n == dots.length) {
            btnTabs.innerHTML = 'Узнать цену';
        }else{
            btnTabs.innerHTML = 'Далее';
        }


        clearActiveClass();
        btnTabs.disabled = true;
        btnTabs.classList.remove('popup-calculator__btn_active');
        tabs[startStep - 1].classList.add('popup-calculator__tabs_active');
        dots[startStep - 1].classList.add('popup-calculator__step_active');


    }

    //Убираем активный класс у элементов
    function clearActiveClass() {

        for(let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('popup-calculator__step_active');

            tabs[i].classList.remove('popup-calculator__tabs_active');

        }
    }

    //Переключение точек
    dots.forEach((elem, i) => {
        elem.addEventListener('click', function () {
            showStep(startStep = i + 1);
        });
    });

    //переключение кнопкой Далее
    btnTabs.addEventListener('click', function () {
        if (startStep < tabs.length) {
            showStep(startStep += 1);

        } else {
            //Отправка формы
            this.type = 'submit';

            multiform.addEventListener('submit', sendCalculatorForm);
        }
    });


    //Send Calculator Form

    function sendCalculatorForm(e){
        e.preventDefault();
        //проверка что все этапы формы пройденны
        if(!validForm) return;

       // console.log(localStorage.getItem('obj'));

        //Очищаем localeStorage
        localStorage.clear();


        //Показываем статус отправки
        let messageBox = document.createElement('div');
        messageBox.classList.add('form__message');

        //AJAX запрос калькулятор

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3010/calc');

        xhr.setRequestHeader('Content-type', 'application/json; charset = utf-8');
        //Проверка сформированной даты

        xhr.send(JSON.stringify(data));

        this.append(messageBox);


       let form = this;

        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState < 4) {
            } else if (xhr.readyState === 4 && xhr.status === 200) {

                //Ответ от сервера
                let obj = JSON.parse(xhr.response);


                // getResultPopup('popup-result', obj);
                showPopup('#popup-result');

                alert(`${obj.place}, ${obj.roller}, ${obj.result.min} // ${obj.result.all}  `);

                showStep(startStep = 1);
                form.removeChild(messageBox);

            } else {
                messageBox.innerText = message.error;
            }
        });
    }

    //END Send Calculator Form

    //Очищаем inputs
    function  clearChecks(el) {
        let elems = document.querySelectorAll(el);

        elems.forEach((el) => {
           el.checked = false;
        });

    }


    for (let i = 0; i < tabs.length; i++) {

        //Отлавливаем клик на tabs
        tabs[i].addEventListener('click', function(e) {

            let target = e.target;

            btnTabs.disabled = true;
            btnTabs.classList.remove('popup-calculator__btn_active');

            if(target.tagName === 'INPUT') {
                this.dataset.tabs = true;
                checkTabs('[data-place],[data-roller],[data-size]');
            }
    });

}
    let data = {};

    //Проверка табов
   function checkTabs(attr) {

        let item;
        for(let i = 0; i < attr.split(',').length; i++) {
            item = document.querySelectorAll(attr);

        }

       item.forEach(el => {
           el.addEventListener('change', function () {
               clearChecks(attr);
               el.checked = true;
             for(let key in el.dataset) {
                 if(key !== 'tabs') {

                     data[key] = el.dataset[key];

                 }

             }
               btnTabs.disabled = false;
               btnTabs.classList.add('popup-calculator__btn_active');

              //Результат заносим в localStorage
               localStorage.setItem('obj', JSON.stringify(data));
           });
       });



   }

   //Проверка что все табы успешно пройдены
   function validForm() {
       for(let i = 0; i < tabs.length; i++) {
           if(tabs[i].dataset.tabs === 'true'){
               return true;
           }else{
              return false;
           }

       }
   }


   //Тестирую вывод информации в popup-resulеt -- СЛОМАН СЛАЙДЕР
   function getResultPopup(id, res) {
       let div = document.createElement('div');

       div.classList.add('popup', 'popup-result');
       div.id = id;

       div.innerHTML = `
       
       <div class="popup-content popup-result-content">
        <button class="popup-content__close">&times;</button>

        <div class="popup-result-slider">
            <div class="popup-result-block">
                <h3 class="popup-result-block__title">Результаты</h3>

                <p class="popup-result-block__descr">${res.place}, <br>${res.roller}, <br>
                    неровность ${res.size} мм.
                </p>

                <span class="popup-result-block__cost">Стоимость работ <br> <strong>- ${res.result.min}</strong> грн/м<sup>2</sup></span>

                <ul class="popup-result-block__list">
                    <li class="popup-result-block__item">Проведение работ</li>
                    <li class="popup-result-block__item">Уборка</li>
                </ul>
                <!-- /.price-block__list -->
            </div>
            <!-- /.price-block popup-result-block -->

            <div class="popup-result-block">
                <h3 class="popup-result-block__title">Результаты</h3>

                <p class="popup-result-block__descr">${res.place}, <br> ${res.roller}, <br>
                    неровность ${res.size} мм.
                </p>

                <span class="popup-result-block__cost">Стоимость работ <br> <strong>- ${res.result.all} </strong> грн/м<sup>2</sup></span>

                <ul class="popup-result-block__list">
                    <li class="popup-result-block__item">Завоз материала и его подъём</li>
                    <li class="popup-result-block__item">Проведение работ</li>
                    <li class="popup-result-block__item">Уборка</li>
                    <li class="popup-result-block__item">Гарантия 2 года</li>
                </ul>
                <!-- /.price-block__list -->
        </div>
        <!-- /.popup-result-slider-->


        </div>
        <!-- /.price-block popup-result-block -->
    </div>
    <!-- /.popup-content popup-calculator-content -->
       
       `;

       document.body.append(div);
   }



















    /*Multiform СТАРОЕ*/
/*
    let multiform = document.forms.calcForm;


    let tabs = document.querySelectorAll('.popup-calculator__tabs');

    //let btnTabs = document.querySelectorAll('.popup-calculator__btn');

    let stepControl = document.querySelector('.popup-calculator__controls');


        for(let i = 0; i < tabs.length; i++) {
            createStep(stepControl);
        }

    let steps = document.querySelectorAll('.popup-calculator__step');

    steps[0].classList.add('popup-calculator__step_active');
    tabs[0].classList.add('popup-calculator__tabs_active');


    //очистка классов у точек и табов
    function clear(){
        for(let i = 0; i < steps.length; i++) {
            steps[i].classList.remove('popup-calculator__step_active');
            tabs[i].classList.remove('popup-calculator__tabs_active');
        }

    }


    //переключение точек и табов
    for(let k = 0; k < steps.length; k++) {
        steps[k].addEventListener('click', function(){
            clear();
            this.classList.add('popup-calculator__step_active');
            tabs[k].classList.add('popup-calculator__tabs_active');
        });
    }




    //Создать точки
    function createStep(el) {
        let step = document.createElement('span');
        step.classList.add('popup-calculator__step');
        el.append(step);
    }
*/





});



