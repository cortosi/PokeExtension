import { Pokemon } from "../model/Pokemon.js"
import { DetailMove } from "../model/DetailMove.js"
import { API } from "../api/API.js"
import { hideLoading, showLoading, getPokemonID, weaknessMap, getWeaknessToType, moveMap, pokemonList, LOAD_BATCH } from "../const.js";

const GRID = document.querySelector(".modal-content-pokedex-grid");

export class Pokedex {
    static moves_game_opt = "sword-shield"
    static moves_cat_filter = "level-up"

    constructor(view) {
        this._loadedP = null
        this._view = view
        this._gridItemLoaded = 0
        this._loadedPokemon = new Map()
        this._loadingItems = false;
    }

    async init() {
        try {
            await API.pokeApiPokemon(1)
        } catch (error) {
            this._view.showErrorGrid(error)
            return;
        }

        // API OK
        await this.loadPokedex(1, LOAD_BATCH)
        this.loadListeners()
    }

    async loadPokedex(from, to) {
        if (from > to) return;

        try {
            await this.loadGridItem(from)
        } catch (error) {
            console.error(error)
        }

        await this.loadPokedex(from + 1, to)
    }

    // Grid
    async loadGridItem(id) {
        const json = await API.pokeApiPokemon(id)

        const name = json.name?.toString() ?? "N/D"
        const type = (json.types && json.types[0] && json.types[0].type) ? json.types[0].type.name : "N/D"
        const subtype = (json.types && json.types[1] && json.types[1].type) ? json.types[1].type.name : null
        const artwork = json.sprites?.other?.['official-artwork']?.front_default ?? " "

        // Update counter
        this._gridItemLoaded++

        // Update View
        this._view.addGridItem(name, type, subtype, artwork)
    }

    // Pokemon Detail
    async loadPokemonDetail(pName) {
        let newPokemon

        try {
            showLoading()

            if (!this._loadedPokemon.has(pName)) {
                newPokemon = new Pokemon(pName)

                // Endpoint requests
                const jsonPokemon = await API.pokeApiPokemon(pName)
                const jsonSpecies = await API.pokeApiPokemonSpecies(pName)

                await this.loadPokemonDetailLeft(jsonPokemon, newPokemon)
                await this.loadPokemonDetailRight(jsonPokemon, jsonSpecies, newPokemon)

                // Save loaded
                this._loadedPokemon.set(pName, newPokemon)
            }

            this._loadedP = this._loadedPokemon.get(pName)

            // Update View
            this._view.updatePokemonDetail(this._loadedP)
            this._view.showPokeDetail()
        } catch (error) {
            console.error(error)
        } finally {
            hideLoading()
        }
    }

    async loadPokemonDetailLeft(jsonPokemon, newPokemon) {
        const id = jsonPokemon.id?.toString() ?? "N/D  "
        const name = jsonPokemon.name?.toString() ?? "N/D"
        const type = (jsonPokemon.types && jsonPokemon.types[0] && jsonPokemon.types[0].type) ? jsonPokemon.types[0].type.name : "N/D"
        const subtype = (jsonPokemon.types && jsonPokemon.types[1] && jsonPokemon.types[1].type) ? jsonPokemon.types[1].type.name : null
        const artwork = jsonPokemon.sprites?.other?.['official-artwork']?.front_default ?? " "

        newPokemon.id = id
        newPokemon.name = name
        newPokemon.type = type
        newPokemon.subtype = subtype
        newPokemon.artwork = artwork
    }

    async loadPokemonDetailRight(jsonPokemon, jsonSpecies, newPokemon) {
        await this.extractPokemonDetailAbout(jsonPokemon, jsonSpecies, newPokemon)
        await this.extractPokemonDetailStats(jsonPokemon, newPokemon)
        await this.extractPokemonDetailMoves(jsonPokemon, newPokemon)
    }

    // About
    async extractPokemonDetailAbout(jsonPokemon, jsonSpecies, p) {
        async function extractSpriteItem(url) {
            if (url == null)
                return null

            const itemJson = await API.pokeApiItem(url, null)
            return itemJson?.sprites?.default ?? null
        }

        let ability = [], hability, genus = "N/D", description = "N/D"
        let evolutions = new Array()

        // Extracting About data
        const height = jsonPokemon.height?.toString() ?? "N/D"
        const weight = jsonPokemon.weight?.toString() ?? "N/D"

        description = (jsonSpecies.flavor_text_entries ?? null)?.find((entry) => entry.language.name === "en")?.flavor_text.replace(/\x0C/g, ' ') ?? "No description found";
        genus = (jsonSpecies.genera ?? null)?.find((entry) => entry.language.name === "en")?.genus;

        // Extracting Egg data
        const eggGroups = jsonSpecies.egg_groups ?? [];
        const eggGroupNames = eggGroups.map(group => group.name);
        const cycles = jsonSpecies.hatch_counter?.toString() ?? "N/D"

        // Extracting Abilities
        const abilities = jsonPokemon.abilities ?? null
        if (abilities != null) {
            ability.push(abilities[0]?.ability?.name ?? "N/D")

            if (abilities.length > 2) {
                ability.push(abilities[1]?.ability?.name ?? "N/D")
                hability = abilities[2]?.ability?.name ?? "N/D"
            } else
                hability = abilities[1]?.ability?.name ?? null
        }

        // Extracting Evolutions
        const chainURL = jsonSpecies?.evolution_chain?.url ?? null
        if (chainURL) {
            const chainJSON = await API.pokeApiEvolutionChain(chainURL)
            const evochain = chainJSON.chain ?? null
            let next = evochain

            if (evochain) {
                while (next) {
                    evolutions.push({
                        id: getPokemonID(next.species?.name),
                        name: next.species?.name ?? null,
                        trigger: next.evolution_details[0]?.trigger?.name ?? null,
                        level: next.evolution_details[0]?.min_level ?? null,
                        happiness: next.evolution_details[0]?.min_happiness ?? null,
                        item: {
                            name: next.evolution_details[0]?.item?.name ?? null,
                            sprite: await extractSpriteItem(next.evolution_details[0]?.item?.url ?? null)
                        }
                    })
                    next = next.evolves_to[0] ?? null
                }
            }
        }

        p.height = height
        p.weight = weight
        p.description = description
        p.ability = ability
        p.hability = hability
        p.genus = genus
        p.cycles = cycles
        p.eggs = eggGroupNames
        p.evolutions = evolutions
    }

    // Stats
    async extractPokemonDetailStats(jsonPokemon, p) {
        // Stats
        const stats = jsonPokemon.stats ?? null

        if (stats) {
            stats.forEach(stat => {
                switch (stat.stat.name) {
                    case "hp":
                        p.hp = stat.base_stat;
                        break;
                    case "attack":
                        p.attack = stat.base_stat;
                        break;
                    case "defense":
                        p.defense = stat.base_stat;
                        break;
                    case "special-attack":
                        p.spAttack = stat.base_stat;
                        break;
                    case "special-defense":
                        p.spDefense = stat.base_stat;
                        break;
                    case "speed":
                        p.speed = stat.base_stat;
                        break;
                    default:
                }
            });
            p.bst = p.hp + p.attack + p.defense + p.spAttack + p.spDefense + p.speed
        }

        // Type Effectiveness
        for (const moveType in weaknessMap) {
            p.addEffectiveness(getWeaknessToType(p.type, p.subtype, moveType), moveType)
        }

    }

    // Moves
    async extractPokemonDetailMoves(jsonPokemon, newPokemon) {
        for (const move of jsonPokemon.moves) {
            let moveName, methodName, gameName, level = null, tm = null, egg = false, tutor = false

            let methods = move.version_group_details;
            for (const method of methods) {
                moveName = move.move.name;
                methodName = method.move_learn_method.name;
                gameName = method.version_group.name;

                switch (methodName) {
                    case "level-up":
                        level = method.level_learned_at
                        break;
                    case "machine":
                        break;
                    case "egg":
                        egg = true
                        break;
                    case "tutor":
                        tutor = true
                        break;
                    default:
                }

                if (newPokemon.moves.get(gameName) && newPokemon.moves.get(gameName)[methodName])
                    newPokemon.moves.get(gameName)[methodName].push(new DetailMove(moveMap.get(moveName), level, tm, egg, tutor))
            }
        }
        newPokemon.sortMoves()
    }

    // Init listners
    loadListeners() {
        document.querySelector(".pokemon-detail-back-btn").addEventListener('click', () => this._view.hidePokeDetail())
        document.querySelectorAll(".pokemon-detail-nav-item").forEach((el) => {
            el.addEventListener("click", () => {
                this._view.changeFrontPanel(el)
            });
        });

        document.querySelector(".pokedex-search").addEventListener('input', () => this._view.onPokemonSearch())
        document.querySelector(".gen-selector-filter").addEventListener('click', () => this._view.showMovesFilterOptions())
        document.querySelectorAll(".gen-option-description").forEach((el) => {
            el.addEventListener('click', () => {
                Pokedex.moves_game_opt = el.getAttribute("data-option");
                this._view.updateTableMoves(this._loadedP);
            })
        })

        document.querySelectorAll(".move-filter").forEach((input) => {
            input.addEventListener('change', () => {
                Pokedex.moves_cat_filter = input.getAttribute("value")
                this._view.updateTableMoves(this._loadedP);
            })
        })

        GRID.addEventListener("scroll", async (event) => {
            const GRID_DOM = event.target;
            const LIST_LEN = pokemonList.length;
            const threshold = GRID_DOM.scrollHeight * 4 / 5;

            if (this._gridItemLoaded >= LIST_LEN || this._loadingItems)
                return;

            if (GRID_DOM.scrollTop + GRID_DOM.clientHeight > threshold) {
                this._loadingItems = true;
                await this.loadPokedex(this._gridItemLoaded + 1, Math.min(this._gridItemLoaded + LOAD_BATCH, LIST_LEN));
                this._loadingItems = false;
            }
        });

    }
}
