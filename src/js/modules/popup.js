class Popup {
    constructor() {

    }

    //Проверка наличие куки
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    showPopup(selector, closeOverley = true) {

        let date = new Date();
        date = new Date(date.setDate(date.getDate() + 1));

        let popup = document.querySelectorAll('.popup');
        popup.forEach(elem => {
            elem.style.visibility = 'hidden';
        });

        let modal = document.querySelector(selector);
        modal.style.display = 'block';
        modal.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';

        window.addEventListener('click', function(event) {
            if(event.target === modal && closeOverley) {
                modal.style.visibility = 'hidden';
                document.body.style.overflow = '';
            }
        });

        document.cookie = `${decodeURI('popup')} = ${decodeURI(true)}; expires = ${date}; path = /`;
        this.closePopup(modal);
    }

   closePopup(modal) {
        let  modalClose = modal.querySelector('.popup-content__close');
        modalClose.addEventListener('click', function(){
            modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
        });

    }
}







