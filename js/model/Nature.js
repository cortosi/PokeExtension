export class Nature {

    constructor(name, incStat, decStat, likesFlavor, hatesFlavor) {
        this._name = name
        this._incStat = incStat
        this._decStat = decStat
        this._likeFlavor = likesFlavor
        this._hatesFlavor = hatesFlavor
    }

    get name() {
        return this._name;
    }
    get incStat() {
        return this._incStat;
    }
    get decStat() {
        return this._decStat;
    }
    get likesFlavor() {
        return this._likeFlavor;
    }
    get hatesFlavor() {
        return this._hatesFlavor;
    }
}