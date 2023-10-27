import { Nature } from "../model/Nature.js";
import { API } from "../api/API.js"

export class Natures {
    constructor(view) {
        this._view = view
    }

    async init() {
        try {
            await API.pokeApiNature(1)
        } catch (error) {
            // this._view.showErrorGrid(error)
            return;
        }

        // API OK
        await this.loadNatures(1, 25)
        this.loadListeners()
    }

    async loadNatures(from, to) {
        if (from > to) return;

        try {
            await this.loadNatureTableItem(from)
        } catch (error) {
            console.error(error)
        }

        await this.loadNatures(from + 1, to)
    }

    async loadNatureTableItem(id) {
        // Endpoint requests
        const NATURE_JSON = await API.pokeApiNature(id)

        // Extract
        const NATURE_NAME = NATURE_JSON?.name ?? "N/D"
        const NATURE_INC = NATURE_JSON?.increased_stat?.name ?? null
        const NATURE_DEC = NATURE_JSON?.decreased_stat?.name ?? null
        const NATURE_FAV = NATURE_JSON?.likes_flavor?.name ?? null
        const NATURE_HATED = NATURE_JSON?.hates_flavor?.name ?? null

        const newNature = new Nature(NATURE_NAME, NATURE_INC, NATURE_DEC, NATURE_FAV, NATURE_HATED)

        // Update View
        this._view.createNaturesTableItem(newNature)
    }

    loadListeners() {
        document.querySelector(".natures-search").addEventListener('input', () => this._view.onNatureSearch())
    }
}