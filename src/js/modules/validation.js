class Validation {
    constructor() {
    }

    //Validation Form
    formValidate(e) {
        const el = e.target;
        const {value, name} = el;

        let names = name;
        let check;
        switch (names) {
            case 'name':
                check = /^[А-Яа-яЁёA-Za-z]{3,11}$/.test(value);
                break;

            case 'email':

                check = /^[a-zA-Z._-]+\d*@[a-z]+?\.[a-z]{2,3}$/.test(value);
                break;
            case 'phone':
                check = this.validatePhone(value);
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
            el.style.border = '2px solid green';

        } else {
            el.style.border = '2px solid red';
            el.value = '';
        }
    }

    //END Validation Form

    //Phone Validation
    validatePhone(val) {
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
}
