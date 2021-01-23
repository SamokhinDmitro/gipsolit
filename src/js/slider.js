/*Slick Slider*/
$(document).ready(function(){

    //Features Slider

    $('.features-slider').slick({
        infinite: true,
        focusOnSelect: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [

            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    prevArrow: '<button class="slider-btn slider-btn__prev"></button>',
                    nextArrow: '<button class="slider-btn slider-btn__next"></button>'
                }
            }
            ],
        autoplay: true,
        autoplaySpeed: 2000
});

    //Feedback Slider

    $('.feedback-slider').slick({
        infinite: true,
        focusOnSelect: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button class="feedback-btn feedback-btn__prev"><img class="feedback-btn__img" src="img/feedback/feedback-prev.svg" alt="prev"></button>',
        nextArrow: '<button class="feedback-btn feedback-btn__next"><img class="feedback-btn__img" src="img/feedback/feedback-next.svg" alt="next"></button>',
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
            ],

        autoplay: true,
        autoplaySpeed: 2000
});

    //Materials

    $('.materials-slider').slick({
        infinite: true,
        focusOnSelect: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [

            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    prevArrow: '<button class="slider-btn slider-btn__prev"></button>',
                    nextArrow: '<button class="slider-btn slider-btn__next"></button>'
                }
            }
        ],
        autoplay: true,
        autoplaySpeed: 2000
    });


    //Popup-result-slider


        $('.popup-result-slider').slick({
            infinite: true,
            focusOnSelect: true,
            slidesToShow: 2,
            slidesToScroll: 1,

            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        prevArrow: '<button class="slider-btn slider-btn__prev"></button>',
                        nextArrow: '<button class="slider-btn slider-btn__next"></button>'
                    }
                }
            ]

        });













});
