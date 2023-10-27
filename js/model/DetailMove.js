import { Move } from "./Move.js"

export class DetailMove extends Move {
    constructor(move, level, tm, egg, tutor) {
        super(move.name, move.description, move.effect, move.pp, move.power, move.accuracy, move.type, move.category)
        this._level = level
        this._tm = tm
        this._egg = egg
        this._tutor = tutor
    }

    get level() {
        return this._level
    }
    get tm() {
        return this._tm
    }
    get egg() {
        return this._egg
    }
    get tutor() {
        return this._tutor
    }
}