class Navigation {

    constructor(btnSelector, navSelector, navSectionSelector) {

        let navBtn = this.navBtn = document.querySelector(btnSelector),
            navBlock = this.navBlock = document.querySelector(navSelector),
            navSection = this.navSection = document.querySelector(navSectionSelector);

        navBtn.addEventListener('click', () => {
            this.navBtn.classList.toggle('navigation-btn__active');
            this.navBlock.classList.toggle('navigation-block__active');
            this.navSection.classList.toggle('navigation__active');
        });

        navSection.addEventListener('click', () => {
            let target = event.target;
            if(target.classList.contains('navigation-block__link') || target.classList.contains('navigation__active')){
                this.navBlock.classList.remove('navigation-block__active');
                this.navSection.classList.remove('navigation__active');
                this.navBtn.classList.remove('navigation-btn__active');
            }
        });
    }

}
