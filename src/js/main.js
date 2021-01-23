window.addEventListener('DOMContentLoaded', function () {

    /*Scroll to Top*/
    new Scrolls('.button_up');

    /*END Scroll to Top*/


    /*POPUP*/

    let popup = new Popup();

    let btnHelp = document.querySelector('#help');
    let btnCalc = document.querySelector('.price-header__calc');

    //Обработка всплывающих окон на сайте
    //Заказать товар
    let btnOrder = document.querySelectorAll('.price-block__btn').forEach(elem => {
        elem.addEventListener('click', () => popup.showPopup('#popup-call'));
    });

    //Popup Table - upsell
    let btnUpsell = document.querySelectorAll('.upsell-block__btn').forEach(elem => {
        elem.addEventListener('click', () => popup.showPopup('#popup-upsell'));
    });


    //Получить консультацию
    btnHelp.addEventListener('click', () => popup.showPopup('#popup-call'));

    //Calculator
    btnCalc.addEventListener('click', () => popup.showPopup('#popup-payment', false));


    if (popup.getCookie('popup') === undefined) {
        setTimeout(() => popup.showPopup('#popup-call'), 5000);
    }
    /*END POPUP*/


    /*NAVIGATION*/

    new Navigation('.navigation-btn', '.navigation-block', '.navigation');

    /*END NAVIGATION*/


    /*SEND FORMS*/

    //Формы на сайте
    let mainForm = document.forms.headerForms;
    let feedbackForm = document.forms.feedbackForm;
    let tourForm = document.forms.tourForm;
    let contactsForm = document.forms.contactsForm;
    let popupForm = document.forms.popupForm;
    let paymentForm = document.forms.paymentForm;


    let sendForm = new SendForm();


    //Обработка форм - отправка AJAX-запроса
    sendForm.processForm(mainForm);
    sendForm.processForm(feedbackForm);
    sendForm.processForm(tourForm);
    sendForm.processForm(contactsForm);
    sendForm.processForm(popupForm);
    sendForm.processForm(paymentForm);

    /*END SEND FORMS*/


    /*Calculator Multiform*/
    let startStep = 1;

    let multiform = document.forms.calcForm;

    let calculator = new Calculator(multiform, startStep, '.popup-calculator__tabs',
        '.popup-calculator__btn',
        '.popup-calculator__controls');

    /*END Calculator Multiform*/

});



