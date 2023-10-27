export class Move {
    constructor(name, description = null, effect = null, pp, power, accuracy, type, category) {
        this._name = name;
        this._description = description;
        this._effect = effect
        this._pp = pp;
        this._power = power;
        this._accuracy = accuracy;
        this._type = type;
        this._category = category;
    }

    // Getter
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get pp() {
        return this._pp;
    }
    get power() {
        return this._power;
    }
    get accuracy() {
        return this._accuracy;
    }
    get type() {
        return this._type;
    }
    get category() {
        return this._category;
    }

    // Setter
    set name(name) {
        this._name = name;
    }
    set description(description) {
        this._description = description;
    }
    set pp(pp) {
        this._pp = pp;
    }
    set power(power) {
        this._power = power;
    }
    set accuracy(accuracy) {
        this._accuracy = accuracy;
    }
    set type(type) {
        this._type = type;
    }
    set category(category) {
        this._category = category;
    }
}