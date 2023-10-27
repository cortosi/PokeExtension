export class Item {
    constructor() {

    }

    get name() {
        return this._name;
    }
    get category() {
        return this._category;
    }
    get effect() {
        return this._effect;
    }
    get description() {
        return this._description
    }
    get sprite() {
        return this._sprite
    }
    set name(name) {
        this._name = name
    }
    set effect(effect) {
        this._effect = effect
    }
    set category(category) {
        this._category = category
    }
    set description(description) {
        this._description = description
    }
    set sprite(sprite) {
        this._sprite = sprite
    }
}