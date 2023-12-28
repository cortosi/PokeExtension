import { moveMap, LOAD_BATCH } from "../const.js"
import { API } from "../api/API.js"

const DETAIL_MODAL = document.querySelector(".moves-detail-modal")
const GRID = document.querySelector(".modal-content-moves-grid");

export class Moves {
    constructor(view) {
        this._view = view
        this._gridItemLoaded = 0
    }

    async init() {
        await this.loadMoves(1, LOAD_BATCH)
        this.loadListeners()
    }

    async loadMoves(from, to) {
        if (from > to) return;

        try {
            await this.loadMoveItem(from)
        } catch (error) {
            console.error(error)
        }

        await this.loadMoves(from + 1, to)
    }

    async loadMoveItem(id) {
        const JSON = await API.pokeApiMove(null, id)

        const M_NAME = JSON.name ?? null

        // Update counter
        this._gridItemLoaded++

        // Update view
        this._view.createMoveItem(moveMap.get(M_NAME))
    }

    async loadMoveDetail(name) {
        const MOVE_TO_LOAD = moveMap.get(name)

        await this._view.updateMoveDetail(MOVE_TO_LOAD)
        this._view.showDetailModal()
    }

    loadListeners() {
        DETAIL_MODAL.addEventListener('click', (event) => this._view.hideDetailModal(event))
        document.querySelector(".moves-search").addEventListener('input', () => this._view.onMoveSearch())

        GRID.addEventListener("scroll", async (event) => {
            const GRID_DOM = event.target;
            const LIST_LEN = moveMap.size
            const threshold = GRID_DOM.scrollHeight * 4 / 5;

            if (this._gridItemLoaded >= LIST_LEN || this._loadingItems)
                return;

            if (GRID_DOM.scrollTop + GRID_DOM.clientHeight > threshold) {
                this._loadingItems = true;
                await this.loadMoves(this._gridItemLoaded + 1, Math.min(this._gridItemLoaded + LOAD_BATCH, LIST_LEN));
                this._loadingItems = false;
            }
        });
    }
}