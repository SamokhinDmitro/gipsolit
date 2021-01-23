class Scrolls {
    constructor(elem) {
        let btnTop = this.btnTop;

        btnTop = document.querySelector(elem);

       btnTop.addEventListener('click', function () {
            window.scroll(0, 0);
        });

        window.addEventListener('scroll', this.showBtn.bind(btnTop));

    }

    showBtn() {

        if (window.pageYOffset > document.documentElement.clientHeight) {
           this.style.display = 'block';
        } else {
            this.style.display = 'none';
        }
    }

}
