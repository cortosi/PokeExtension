import {removeAllChild, itemsList } from "../const.js"

const RESULTS_DOM = document.querySelector(".items-search-results")
const ITEMS_GRID = document.querySelector(".modal-content-items-grid")

export class ItemsView {
    constructor() { }

    async setController(controller) {
        this._controller = controller
    }

    createGridItem(name, cat, sprite) {
        const GRID_ITEM = document.createElement("div")
        const GRID_ITEM_LEFT = document.createElement("div")
        const GRID_ITEM_NAME = document.createElement("p")
        const GRID_ITEM_CAT = document.createElement("p")
        const GRID_ITEM_RIGHT = document.createElement("div")
        const GRID_ITEM_SPRITE = document.createElement("div")

        GRID_ITEM.classList.add("modal-content-items-grid-item")
        GRID_ITEM_LEFT.classList.add("modal-content-items-grid-item-left")
        GRID_ITEM_NAME.classList.add("item-name")
        GRID_ITEM_CAT.classList.add("item-category")
        GRID_ITEM_RIGHT.classList.add("modal-content-items-grid-item-right")
        GRID_ITEM_SPRITE.classList.add("item-sprite")

        GRID_ITEM_NAME.textContent = name.replace("-", " ")
        GRID_ITEM_CAT.textContent = cat.replace("-", " ")
        GRID_ITEM_SPRITE.style.background = `url("${sprite}") center/contain no-repeat`

        GRID_ITEM.addEventListener('click', () => this._controller.loadItemDetail(name))

        GRID_ITEM.append(GRID_ITEM_LEFT, GRID_ITEM_RIGHT)
        GRID_ITEM_LEFT.append(GRID_ITEM_NAME, GRID_ITEM_CAT)
        GRID_ITEM_RIGHT.append(GRID_ITEM_SPRITE)

        ITEMS_GRID.appendChild(GRID_ITEM)
    }

    showItemDetail() {
        document.querySelector(".items-detail-modal").classList.toggle("show-detail-items")
    }

    hideItemDetail(event) {
        event.target.classList.remove("show-detail-items")
    }

    async updateItemDetail(item) {
        document.querySelector(".items-detail-item-icon").style.background = `url("${item.sprite}") center/contain no-repeat`
        document.querySelector(".items-detail-item-name").textContent = item.name.replace("-", " ")
        document.querySelector(".items-detail-item-cat").textContent = item.category.replace("-", " ")
        document.querySelector(".items-detail-item-effect").textContent = item.effect ?? "-"
        document.querySelector(".items-detail-item-desc").textContent = item.description ?? "-"
    }

    onItemSearch() {
        removeAllChild(RESULTS_DOM)

        const textIn = document.querySelector(".items-search").value.replace(" ", "-");
        const resArr = new Array();

        if (textIn == "") {
            return;
        }

        var regex = new RegExp("^" + textIn, "i");

        for (const item of itemsList) {
            if (regex.test(item)) {
                resArr.push(item);
                if (resArr.length >= 7)
                    break
            }
        }

        resArr.forEach((itemName) => {
            const ITEM_SEARCH_RESULT = document.createElement("div")
            const ITEM_SEARCH_RESULT_ICON_WRAPP = document.createElement("div")
            const ITEM_SEARCH_RESULT_ICON = document.createElement("div")
            const ITEM_SEARCH_RESULT_NAME = document.createElement("div")


            ITEM_SEARCH_RESULT.classList.add("items-search-result")
            ITEM_SEARCH_RESULT_NAME.classList.add("items-search-result-name")
            ITEM_SEARCH_RESULT_ICON_WRAPP.classList.add("items-search-result-icon-wrapp")
            ITEM_SEARCH_RESULT_ICON.classList.add("items-search-result-icon")

            ITEM_SEARCH_RESULT_NAME.textContent = itemName.replace("-", " ")

            console.log(itemName)
            if (/^TM\d{2}(?:[0-9]|Z)?$/i.test(itemName)) {
                console.log("passo")
                ITEM_SEARCH_RESULT_ICON.style.background = `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png") center/contain no-repeat`
            } else
                ITEM_SEARCH_RESULT_ICON.style.background = `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemName}.png") center/contain no-repeat`

            ITEM_SEARCH_RESULT.addEventListener('click', async () => {
                document.querySelector(".items-search").value = ""
                removeAllChild(RESULTS_DOM)
                await this._controller.loadItemDetail(itemName);
            })

            ITEM_SEARCH_RESULT.append(ITEM_SEARCH_RESULT_ICON_WRAPP, ITEM_SEARCH_RESULT_NAME)
            ITEM_SEARCH_RESULT_ICON_WRAPP.appendChild(ITEM_SEARCH_RESULT_ICON)
            RESULTS_DOM.appendChild(ITEM_SEARCH_RESULT)
        });
    }
}