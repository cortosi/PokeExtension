import { removeAllChild, abiltiesList, getPokemonID } from "../const.js"

const ABILITY_LIST_DOM = document.querySelector(".modal-content-ability-list")
const RESULTS_DOM = document.querySelector(".abilities-search-results")

export class AbilitiesView {
    constructor() {
    }

    async setController(controller) {
        this._controller = controller
    }

    createAbilityItem(name, effect) {
        const ABILITY_ITEM = document.createElement("div")
        const ABILITY_ITEM_HEAD = document.createElement("div")
        const ABILITY_ITEM_NAME = document.createElement("p")
        const ABILITY_ITEM_CONTENT = document.createElement("div")
        const ABILITY_ITEM_DESCRIPTION = document.createElement("p")

        ABILITY_ITEM.classList.add("ability-row")
        ABILITY_ITEM_HEAD.classList.add("ability-row-head")
        ABILITY_ITEM_NAME.classList.add("ability-name")
        ABILITY_ITEM_CONTENT.classList.add("ability-row-content")
        ABILITY_ITEM_DESCRIPTION.classList.add("ability-description")

        ABILITY_ITEM_NAME.textContent = name.replace("-", " ")
        ABILITY_ITEM_DESCRIPTION.textContent = effect

        ABILITY_ITEM.addEventListener('click', () => this._controller.loadAbilityDetail(name))

        ABILITY_ITEM.append(ABILITY_ITEM_HEAD, ABILITY_ITEM_CONTENT)
        ABILITY_ITEM_HEAD.appendChild(ABILITY_ITEM_NAME)
        ABILITY_ITEM_CONTENT.appendChild(ABILITY_ITEM_DESCRIPTION)
        ABILITY_LIST_DOM.appendChild(ABILITY_ITEM)
    }

    showAbilityDetail() {
        document.querySelector(".abilities-detail-modal").classList.toggle("show-detail-abilities")
    }

    hideAbilityDetail(event) {
        event.target.classList.remove("show-detail-abilities")
    }

    async updateAbilityDetail(a) {
        document.querySelector(".abilities-detail-learners-wrapp").textContent = ""

        document.querySelector(".abilities-detail-move-name").textContent = a.name.replace("-", " ")
        document.querySelector(".abilities-detail-move-desc").textContent = a.description
        document.querySelector(".abilities-detail-move-effect").textContent = a.effect

        a.learners.forEach(el => {
            const LEARNER_ITEM = document.createElement("div")
            const LEARNER_ITEM_CIRCLE = document.createElement("div")
            const LEARNER_ITEM_ARTWORK = document.createElement("div")
            const LEARNER_NAME = document.createElement("p")

            LEARNER_ITEM.className = "abilities-detail-learner-item"
            LEARNER_ITEM_CIRCLE.className = "abilities-detail-learner-circle"
            LEARNER_ITEM_ARTWORK.className = "abilities-detail-learner-artwork"

            const POKE_ID = getPokemonID(el.pokemon.name)
            LEARNER_ITEM_ARTWORK.style.background = `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${POKE_ID}.png") center/contain no-repeat`

            LEARNER_NAME.className = "abilities-detail-learner-name"
            LEARNER_NAME.textContent = el?.pokemon?.name ?? "N/D"

            LEARNER_ITEM.appendChild(LEARNER_ITEM_CIRCLE)
            LEARNER_ITEM.appendChild(LEARNER_NAME)
            LEARNER_ITEM_CIRCLE.appendChild(LEARNER_ITEM_ARTWORK)

            document.querySelector(".abilities-detail-learners-wrapp").appendChild(LEARNER_ITEM)
        })
    }

    onAbilitySearch() {
        removeAllChild(RESULTS_DOM)

        const textIn = document.querySelector(".abilities-search").value.replace(" ", "-");
        const resArr = new Array();

        if (textIn == "") {
            return;
        }

        var regex = new RegExp("^" + textIn, "i");

        for (const ability of abiltiesList) {
            if (regex.test(ability)) {
                resArr.push(ability);
                if (resArr.length >= 7)
                    break
            }
        }

        resArr.forEach((a) => {
            const MOVE_SEARCH_RESULT = document.createElement("div")
            const MOVE_SEARCH_RESULT_NAME = document.createElement("div")

            MOVE_SEARCH_RESULT.classList.add("ability-search-result")
            MOVE_SEARCH_RESULT_NAME.classList.add("ability-search-result-name")

            MOVE_SEARCH_RESULT_NAME.textContent = a.replace("-", " ")

            MOVE_SEARCH_RESULT.addEventListener('click', async () => {
                document.querySelector(".abilities-search").value = ""
                removeAllChild(RESULTS_DOM)
                await this._controller.loadAbilityDetail(a);
            })

            MOVE_SEARCH_RESULT.append(MOVE_SEARCH_RESULT_NAME)
            RESULTS_DOM.appendChild(MOVE_SEARCH_RESULT)
        });
    }
}
