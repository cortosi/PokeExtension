const TABLE_BODY = document.querySelector(".nature-table-body")

export class NaturesView {
    #nameMap = new Map([
        ["special-attack", "Sp.Attk"],
        ["special-defense", "Sp.Def"],
        ["defense", "Defense"],
        ["attack", "Attack"],
        ["speed", "Speed"]
    ])

    constructor() { }

    async setController(controller) {
        this._controller = controller
    }

    createNaturesTableItem(n) {
        const TABLE_ROW = document.createElement("div")
        const TABLE_ROW_CELL_NAME = document.createElement("p")
        const TABLE_ROW_CELL_INC = document.createElement("p")
        const TABLE_ROW_CELL_DEC = document.createElement("p")
        const TABLE_ROW_CELL_FAV = document.createElement("p")
        const TABLE_ROW_CELL_HATED = document.createElement("p")

        TABLE_ROW.classList.add("nature-table-row")
        TABLE_ROW_CELL_NAME.classList.add("nature-row-cell")
        TABLE_ROW_CELL_INC.classList.add("nature-row-cell", "row_cell_inc")
        TABLE_ROW_CELL_DEC.classList.add("nature-row-cell", "row_cell_dec")
        TABLE_ROW_CELL_FAV.classList.add("nature-row-cell")
        TABLE_ROW_CELL_HATED.classList.add("nature-row-cell")

        TABLE_ROW_CELL_NAME.textContent = n.name

        if (n.incStat)
            TABLE_ROW_CELL_INC.textContent = this.#nameMap.get(n.incStat)
        else
            TABLE_ROW_CELL_INC.textContent = "-"

        if (n.decStat)
            TABLE_ROW_CELL_DEC.textContent = this.#nameMap.get(n.decStat)
        else
            TABLE_ROW_CELL_DEC.textContent = "-"

        if (n.likesFlavor)
            TABLE_ROW_CELL_FAV.textContent = n.likesFlavor
        else
            TABLE_ROW_CELL_FAV.textContent = "-"

        if (n.hatesFlavor)
            TABLE_ROW_CELL_HATED.textContent = n.hatesFlavor
        else
            TABLE_ROW_CELL_HATED.textContent = "-"

        TABLE_ROW.setAttribute("data-name", n.name)
        TABLE_ROW.append(TABLE_ROW_CELL_NAME, TABLE_ROW_CELL_INC, TABLE_ROW_CELL_DEC, TABLE_ROW_CELL_FAV, TABLE_ROW_CELL_HATED)
        TABLE_BODY.appendChild(TABLE_ROW)
    }

    onNatureSearch() {
        const textIn = document.querySelector(".natures-search").value.trim()

        var regex = new RegExp("^" + textIn, "i");

        if (!textIn)
            document.querySelectorAll(".nature-table-row").forEach((row) => row.style.display = "table-row")

        document.querySelectorAll(".nature-table-row").forEach((row) => {
            if (regex.test(row.getAttribute("data-name"))) {
                row.style.display = "table-row"
            } else
                row.style.display = "none"
        })

    }
}