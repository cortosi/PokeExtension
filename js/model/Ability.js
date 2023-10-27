export class Ability {
    constructor() {

    }

    get id() {
        return this._id
    }
    get name() {
        return this._name
    }
    get effect() {
        return this._effect
    }
    get description() {
        return this._description
    }
    get learners() {
        return this._learners
    }

    set id(id) {
        this._id = id
    }
    set name(name) {
        this._name = name
    }
    set effect(effect) {
        this._effect = effect
    }
    set description(description) {
        this._description = description
    }
    set learners(learners) {
        this._learners = learners
    }

}