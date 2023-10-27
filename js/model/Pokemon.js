import { weaknessMap } from "../const.js";

export class Pokemon {

    constructor(name) {
        this._name = name

        this._effectiveness = new Map([
            ["1x", []],
            ["4x", []],
            ["2x", []],
            ["05x", []],
            ["0x", []]
        ]);

        this._moves = new Map([
            ["red-blue", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["yellow", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["gold-silver", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["crystal", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["ruby-sapphire", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["emerald", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["firered-leafgreen", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["diamond-pearl", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["platinum", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["heartgold-soulsilver", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["black-white", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["black-2-white-2", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["x-y", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["omega-ruby-alpha-sapphire", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["sun-moon", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["ultra-sun-ultra-moon", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["lets-go-pikachu-lets-go-eevee", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["sword-shield", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["brilliant-diamond-and-shining-pearl", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
            ["scarlet-violet", {
                "level-up": [],
                "machine": [],
                "tutor": [],
                "egg": []
            }],
        ]);
    }

    sortMoves() {
        function levelComparator(m1, m2) {
            return m1.level - m2.level
        }

        function machineComparator(m1, m2) {
            if (m1.name < m2.name) {
                return -1;
            }
            if (m1.name > m2.name) {
                return 1;
            }

            return 0; // I nomi sono uguali
        }

        for (const [gen, movesArr] of this._moves) {
            movesArr["level-up"].sort(levelComparator)
            movesArr["machine"].sort(machineComparator)
        }
    }

    // Instances
    addEffectiveness(ratio, weakness) {
        switch (ratio) {
            case 0:
                this._effectiveness.get("0x").push(weakness)
                break;
            case 0.5:
                this._effectiveness.get("05x").push(weakness)
                break;
            case 1:
                this._effectiveness.get("1x").push(weakness)
                break;
            case 2:
                this._effectiveness.get("2x").push(weakness)
                break;
            case 4:
                this._effectiveness.get("4x").push(weakness)
                break;
        }
    }

    // Getters
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get subtype() {
        return this._subtype;
    }
    get artwork() {
        return this._artwork;
    }
    get height() {
        return this._height;
    }
    get weight() {
        return this._weight;
    }
    get abilities() {
        return this._abilities;
    }
    get hp() {
        return this._hp;
    }
    get attack() {
        return this._attack;
    }
    get defense() {
        return this._defense;
    }
    get spAttack() {
        return this._spAttack;
    }
    get spDefense() {
        return this._spDefense;
    }
    get speed() {
        return this._speed;
    }
    get bst() {
        return this._bst
    }
    get description() {
        return this._description
    }
    get ability() {
        return this._ability
    }
    get hability() {
        return this._hability
    }
    get genus() {
        return this._genus
    }
    get eggs() {
        return this._eggs
    }
    get cycles() {
        return this._cycles
    }
    get evolutions() {
        return this._evolutions
    }
    get effectiveness() {
        return this._effectiveness
    }
    get moves() {
        return this._moves;
    }

    // Setters
    set id(id) {
        this._id = id
    }
    set name(name) {
        this._name = name
    }
    set type(type) {
        this._type = type
    }
    set subtype(subtype) {
        this._subtype = subtype
    }
    set artwork(artwork) {
        this._artwork = artwork
    }
    set height(height) {
        this._height = height
    }
    set weight(weight) {
        this._weight = weight
    }
    set abilities(abilities) {
        this._abilities = abilities
    }
    set hp(hp) {
        this._hp = hp
    }
    set attack(attack) {
        this._attack = attack
    }
    set defense(defense) {
        this._defense = defense
    }
    set spAttack(spAttack) {
        this._spAttack = spAttack
    }
    set spDefense(spDefense) {
        this._spDefense = spDefense
    }
    set speed(speed) {
        this._speed = speed
    }
    set bst(bst) {
        this._bst = bst
    }
    set description(description) {
        this._description = description
    }
    set ability(ability) {
        this._ability = ability
    }
    set hability(hability) {
        this._hability = hability
    }
    set genus(genus) {
        this._genus = genus
    }
    set cycles(cycles) {
        this._cycles = cycles
    }
    set eggs(eggs) {
        this._eggs = eggs
    }
    set evolutions(evolutions) {
        this._evolutions = evolutions
    }
    set effectiveness(effectiveness) {
        this._effectiveness = effectiveness
    }
}