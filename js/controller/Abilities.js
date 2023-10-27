import { API } from "../api/API.js";
import { Ability } from "../model/Ability.js";
import { showLoading, hideLoading, LOAD_BATCH, abiltiesList } from "../const.js";

const DETAIL_MODAL = document.querySelector(".abilities-detail-modal")
const LIST = document.querySelector(".modal-content-ability-list");

export class Abilities {
    constructor(view) {
        this._loadedAbilities = new Map()
        this._view = view
        this._listItemLoaded = 0
        this._loadingItems = false
    }

    async init() {
        try {
            await API.pokeApiAbility(1)
        } catch (error) {
            // this._view.showErrorGrid(error)
            return;
        }

        // API OK
        await this.loadAbilities(1, 30)
        this.loadListeners()
    }

    async loadAbilities(from, to) {
        if (from > to) return;

        try {
            await this.loadAbilityItem(from)
        } catch (error) {
            console.error(error)
        }

        await this.loadAbilities(from + 1, to)
    }

    async loadAbilityItem(id) {
        let ability_effect

        // Endpoint requests
        const ABILITY_JSON = await API.pokeApiAbility(id)

        searchLoop: for (let i = 0; i < ABILITY_JSON.effect_entries.length; i++) {
            const el = ABILITY_JSON.effect_entries[i];
            if (el.language.name === "en") {
                ability_effect = el.effect.replace("\n", " ");
                break searchLoop;
            }
        }

        // Update Counter
        this._listItemLoaded++
        // Update View
        this._view.createAbilityItem(ABILITY_JSON.name ?? "N/D", ability_effect)
    }

    async loadAbilityDetail(id) {
        let ability_effect = "", ability_desc = ""
        let newAbility

        try {
            showLoading()

            if (!this._loadedAbilities.has(id)) {
                newAbility = new Ability(id)

                // Endpoint requests
                const ABILITY_JSON = await API.pokeApiAbility(id)

                // Extract
                const ABILITY_NAME = ABILITY_JSON.name ?? "N/D"
                const ABILITY_LEARNERS = ABILITY_JSON.pokemon ?? null

                searchLoop: for (let i = 0; i < ABILITY_JSON.effect_entries.length; i++) {
                    const el = ABILITY_JSON.effect_entries[i];
                    if (el.language.name === "en") {
                        ability_effect = el.effect.replace("\n", " ");
                        break searchLoop;
                    }
                }

                searchLoop: for (let i = 0; i < ABILITY_JSON.flavor_text_entries.length; i++) {
                    const el = ABILITY_JSON.flavor_text_entries[i];
                    if (el.language.name === "en") {
                        ability_desc = el.flavor_text.replace("\n", " ");
                        break searchLoop;
                    }
                }

                newAbility.name = ABILITY_NAME
                newAbility.learners = ABILITY_LEARNERS
                newAbility.description = ability_desc
                newAbility.effect = ability_effect

                // Save loaded
                this._loadedAbilities.set(id, newAbility)
            }

            // Update View
            await this._view.updateAbilityDetail(this._loadedAbilities.get(id))
            this._view.showAbilityDetail()
        } catch (error) {
            console.error(error)
        } finally {
            hideLoading()
        }
    }

    loadListeners() {
        DETAIL_MODAL.addEventListener('click', (event) => this._view.hideAbilityDetail(event))
        document.querySelector(".abilities-search").addEventListener('input', () => this._view.onAbilitySearch())

        LIST.addEventListener("scroll", async (event) => {
            const LIST_DOM = event.target;
            const LIST_LEN = abiltiesList.length
            const threshold = LIST_DOM.scrollHeight * 4 / 5;

            if (this._listItemLoaded >= LIST_LEN || this._loadingItems)
                return;

            if (LIST_DOM.scrollTop + LIST_DOM.clientHeight > threshold) {
                this._loadingItems = true;
                await this.loadAbilities(this._listItemLoaded + 1, Math.min(this._listItemLoaded + LOAD_BATCH, LIST_LEN));
                this._loadingItems = false;
            }
        });
    }
}   