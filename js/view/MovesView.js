import { moveMap } from "../const.js"
import { IMGS_PATH, ICONS_PATH, removeAllChild } from "../const.js"

const MOVE_LIST_ELEMENT = document.querySelector(".modal-content-moves-grid")
const RESULTS_DOM = document.querySelector(".moves-search-results")

export class MovesView {
    async setController(controller) {
        this._controller = controller
    }

    createMoveItem(m) {
        // Crea un nuovo elemento div con la classe "move-item"
        const moveItem = document.createElement('div')
        const moveTop = document.createElement('div')
        const typeWrapper = document.createElement('div')
        const typeDiv = document.createElement('div')
        const nameWrapp = document.createElement('div')
        const nameP = document.createElement('p')
        const moveBottom = document.createElement('div')
        const valuesWrapp = document.createElement('div')
        const pwrWrapp = document.createElement('div')
        const accWrapp = document.createElement('div')
        const ppWrapp = document.createElement('div')
        const pwrIcon = document.createElement('span')
        const accIcon = document.createElement('span')
        const ppIcon = document.createElement('span')
        const pwrValue = document.createElement('p')
        const accValue = document.createElement('p')
        const ppValue = document.createElement('p')

        moveItem.classList.add('move-item')
        moveTop.classList.add('move-item-top')
        moveBottom.classList.add('move-item-bottom')
        typeWrapper.classList.add('move-item-type-wrapp')
        typeDiv.classList.add('move-item-type-icon')
        nameWrapp.classList.add('move-item-name-wrapp')
        nameP.classList.add('move-item-name')
        valuesWrapp.classList.add('move-item-values-wrapp')
        pwrWrapp.classList.add('move-item-pwr-wrapp')
        accWrapp.classList.add('move-item-acc-wrapp')
        ppWrapp.classList.add('move-item-pp-wrapp')
        pwrIcon.classList.add('move-item-pwr-icon')
        accIcon.classList.add('move-item-acc-icon')
        ppIcon.classList.add('move-item-pp-icon')
        pwrValue.classList.add('move-item-pwr-value')
        accValue.classList.add('move-item-acc-value')
        ppValue.classList.add('move-item-pp-value')

        ppIcon.textContent = "PP"
        nameP.textContent = m.name.replace("-", " ")
        typeDiv.style.background = `url("${IMGS_PATH}${m.type}type.png") center/80% no-repeat`
        moveItem.style.backgroundColor = `var(--${m.type}-clr-bg-type)`

        if (m.type == "dark" || m.type == "ground" || m.type == "water" || m.type == "steel" || m.type == "rock" || m.type == "poison" || m.type == "ghost" || m.type == "grass") {
            pwrWrapp.style.boxShadow = "0 0 .3rem var(--clr-primary-white)"
            accWrapp.style.boxShadow = "0 0 .3rem var(--clr-primary-white)"
            ppWrapp.style.boxShadow = "0 0 .3rem var(--clr-primary-white)"

            nameP.style.color = "var(--clr-primary-white)"
            ppIcon.style.color = "var(--clr-primary-white)"
            ppValue.style.color = "var(--clr-primary-white)"
            accValue.style.color = "var(--clr-primary-white)"
            pwrValue.style.color = "var(--clr-primary-white)"
            pwrIcon.style.background = `url("${ICONS_PATH}pwr_white.png") center/contain no-repeat`
            accIcon.style.background = `url("${ICONS_PATH}acc_white.png") center/contain no-repeat`
        }

        if (m.power)
            pwrValue.textContent = m.power
        else
            pwrValue.textContent = "--"


        if (m.accuracy)
            accValue.textContent = m.accuracy
        else
            accValue.textContent = "--"

        ppValue.textContent = m.pp


        typeWrapper.appendChild(typeDiv)
        nameWrapp.appendChild(nameP)
        moveTop.append(typeWrapper, nameWrapp)
        moveBottom.append(valuesWrapp)
        moveItem.append(moveTop, moveBottom)
        moveBottom.appendChild(valuesWrapp)
        valuesWrapp.append(pwrWrapp, accWrapp, ppWrapp)
        pwrWrapp.append(pwrIcon, pwrValue)
        accWrapp.append(accIcon, accValue)
        ppWrapp.append(ppIcon, ppValue)

        moveItem.addEventListener('click', async () => {
            await this.updateMoveDetail(m)
            this.showDetailModal()
        })
        MOVE_LIST_ELEMENT.appendChild(moveItem)
    }

    showDetailModal() {
        document.querySelector(".moves-detail-modal").classList.toggle("show-detail-moves")
    }

    hideDetailModal(event) {
        event.target.classList.remove("show-detail-moves")
    }

    onMoveSearch() {
        removeAllChild(RESULTS_DOM)

        const textIn = document.querySelector(".moves-search").value.replace(" ", "-");
        const resArr = new Array();

        if (textIn == "") {
            return;
        }

        var regex = new RegExp("^" + textIn, "i");

        for (const [name, move] of moveMap) {
            if (regex.test(name)) {
                resArr.push(move);
                if (resArr.length >= 5)
                    break
            }
        }

        resArr.forEach((m) => {
            const MOVE_SEARCH_RESULT = document.createElement("div")
            const MOVE_SEARCH_TYPE_WRAPP = document.createElement("div")
            const MOVE_SEARCH_TYPE_ICON = document.createElement("div")
            const MOVE_SEARCH_RESULT_NAME = document.createElement("div")

            MOVE_SEARCH_RESULT.classList.add("move-search-result")
            MOVE_SEARCH_TYPE_WRAPP.classList.add("move-search-result-type-wrapp")
            MOVE_SEARCH_TYPE_ICON.classList.add("move-search-result-type-icon")
            MOVE_SEARCH_RESULT_NAME.classList.add("move-search-result-name")

            MOVE_SEARCH_TYPE_WRAPP.style.backgroundColor = `var(--${m.type}-clr-bg-type)`
            MOVE_SEARCH_TYPE_ICON.style.background = `url("${IMGS_PATH}${m.type}type.png") center/70% no-repeat`
            MOVE_SEARCH_RESULT_NAME.textContent = m.name.replace("-", " ")

            MOVE_SEARCH_RESULT.addEventListener('click', async () => {
                document.querySelector(".moves-search").value = ""
                removeAllChild(RESULTS_DOM)
                await this._controller.loadMoveDetail(m.name);
            })

            MOVE_SEARCH_RESULT.append(MOVE_SEARCH_TYPE_WRAPP, MOVE_SEARCH_RESULT_NAME)
            MOVE_SEARCH_TYPE_WRAPP.appendChild(MOVE_SEARCH_TYPE_ICON)
            RESULTS_DOM.appendChild(MOVE_SEARCH_RESULT)
        });

    }

    async updateMoveDetail(m) {
        document.querySelector(".moves-detail-move-name").textContent = m.name.replace("-", " ")
        document.querySelector(".moves-detail-move-desc").textContent = m.description
        document.querySelector(".moves-detail-move-effect").textContent = m.effect

        document.querySelector(".moves-detail-type-wrapp").style.backgroundColor = `var(--${m.type}-clr-bg-type)`
        document.querySelector(".moves-detail-type-icon").style.background = `url("${IMGS_PATH}${m.type}type.png") center/contain no-repeat`
        document.querySelector(".moves-detail-cat-icon").style.background = `url("${IMGS_PATH}${m.category}.png") center/contain no-repeat`
    }
}