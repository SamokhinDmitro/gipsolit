class Result {
    constructor(place, roller, size) {
        this._place = place;
        this._roller = roller;
        this._size = size;
    }


    roundToDecimal(currency, percent) {
        return Math.round(currency / 100) * percent;
    }

    costWorks() {

        const baseCurrency = 100;
        const allInclusive = 15;

        let percentlocation,
            worksType,
            wallType;

        switch (this._place) {
            case 'Киев':
                percentlocation = 10;
                break;
            case 'Область':
                percentlocation = 20;
                break;
            default:
                percentlocation = 15;
        }

        //Вид работ
        if(this._roller === 'Под шпатлевку') {
            worksType = 30;
        }else if (this._roller  === 'Под обои') {
            worksType = 50;

        }

        //Неровность стен
        switch (Number(this._size)) {
            case 20:
                wallType = 10;
                break;
            case 40:
                wallType = 20;
                break;
            case 60:
                wallType = 30;
                break;
            default:
                wallType = 15;
        }

        //Мнимая формула
        //Минимальная цена
        let res = baseCurrency + this.roundToDecimal(baseCurrency, percentlocation) + this.roundToDecimal(baseCurrency, worksType) + this.roundToDecimal(baseCurrency, wallType);

        //Полная цена
        let allRes = res + this.roundToDecimal(res, allInclusive);


        return {min: res, all: allRes};

    }


}

module.exports = Result;
