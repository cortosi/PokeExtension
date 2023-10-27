import { API } from "../api/API.js";
import { Item } from "../model/Item.js";
import { showLoading, hideLoading, itemsList, LOAD_BATCH } from "../const.js";

const DETAIL_MODAL = document.querySelector(".items-detail-modal")
const GRID = document.querySelector(".modal-content-items-grid");

export class Items {

    constructor(view) {
        this._loadedItems = new Map()
        this._view = view
        this._gridItemLoaded = 0
    }

    async init() {
        await this.loadItems(1, 30)
        this.loadListeners()
    }

    async loadItems(from, to) {
        if (from > to) return;

        try {
            await this.loadItem(from)
        } catch (error) {
            console.error(error)
        }

        await this.loadItems(from + 1, to)
    }

    async loadItem(id) {
        const ITEM_JSON = await API.pokeApiItem(null, id)

        const ITEM_NAME = ITEM_JSON.name ?? null
        const ITEM_CAT = ITEM_JSON?.category?.name ?? null
        const ITEM_SPRITE = ITEM_JSON?.sprites?.default ?? null

        // Update counter
        this._gridItemLoaded++
        // Update view
        this._view.createGridItem(ITEM_NAME, ITEM_CAT, ITEM_SPRITE)
    }

    async loadItemDetail(name) {
        let item_effect = null, item_desc = null
        let newItem

        try {
            showLoading()

            if (!this._loadedItems.has(name)) {
                newItem = new Item()

                // Endpoint requests
                const ITEM_JSON = await API.pokeApiItem(null, name)

                // Extract
                const ITEM_NAME = ITEM_JSON.name ?? null
                const ITEM_CAT = ITEM_JSON?.category?.name ?? null
                const ITEM_SPRITE = ITEM_JSON?.sprites?.default ?? null

                searchLoop: for (let i = 0; i < ITEM_JSON.effect_entries.length; i++) {
                    const el = ITEM_JSON.effect_entries[i];
                    if (el.language.name === "en") {
                        item_effect = el.effect.replace("\n", " ");
                        break searchLoop;
                    }
                }

                searchLoop: for (let i = 0; i < ITEM_JSON.flavor_text_entries.length; i++) {
                    const el = ITEM_JSON.flavor_text_entries[i];
                    if (el.language.name === "en") {
                        item_desc = el.text.replace("\n", " ");
                        break searchLoop;
                    }
                }

                newItem.name = ITEM_NAME
                newItem.category = ITEM_CAT
                newItem.sprite = ITEM_SPRITE
                newItem.effect = item_effect
                newItem.description = item_desc

                // Save loaded
                this._loadedItems.set(name, newItem)
            }

            // Update View
            await this._view.updateItemDetail(this._loadedItems.get(name))
            this._view.showItemDetail()
        } catch (error) {
            console.error(error)
        } finally {
            hideLoading()
        }
    }

    loadListeners() {
        DETAIL_MODAL.addEventListener('click', (event) => this._view.hideItemDetail(event))
        document.querySelector(".items-search").addEventListener('input', () => this._view.onItemSearch())

        GRID.addEventListener("scroll", async (event) => {
            const GRID_DOM = event.target;
            const LIST_LEN = itemsList.length
            const threshold = GRID_DOM.scrollHeight * 4 / 5;

            if (this._gridItemLoaded >= LIST_LEN || this._loadingItems)
                return;

            if (GRID_DOM.scrollTop + GRID_DOM.clientHeight > threshold) {
                this._loadingItems = true;
                await this.loadItems(this._gridItemLoaded + 1, Math.min(this._gridItemLoaded + LOAD_BATCH, LIST_LEN));
                this._loadingItems = false;
            }
        });
    }
}