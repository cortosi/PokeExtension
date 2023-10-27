import { IMGS_PATH, ICONS_PATH, colorMapEggGroupsColor, classMapDetailLeftTypeBg, removeAllChild, pokemonList, machineMap } from "../const.js"
import { Pokedex } from "../controller/Pokedex.js";

const GRID = document.querySelector(".modal-content-pokedex-grid")
const POK_DET_MODEL = document.querySelector(".pokemon-detail-modal")
const POK_DET_MODEL_LEFT = document.querySelector(".pokemon-detail-left")
const POK_DET_TYPE = document.querySelector(".pokemon-detail-type")
const POK_DET_TYPE_NAME = document.querySelector(".pokemon-detail-type-name")
const POK_DET_SUBTYPE = document.querySelector(".pokemon-detail-subtype")
const POK_DET_SUBTYPE_NAME = document.querySelector(".pokemon-detail-subtype-name")
const RESULTS_DOM = document.querySelector(".pokedex-search-results")
const MOVES_TABLE_WRAPP = document.querySelector(".pokemon-detail-moves-table-wrapp");
const MOVES_TABLE_BODY = document.querySelector(".pokemon-moves-table-body");


const filterValToTextMap = new Map([
    ["red-blue", "Red - Blue"],
    ["yellow", "Yellow"],
    ["gold-silver", "Gold - Silver"],
    ["crystal", "Crystal"],
    ["ruby-sapphire", "Ruby - Shapphire"],
    ["emerald", "Emerald"],
    ["firered-leafgreen", "Fire Red - Leaf Green"],
    ["diamond-pearl", "Diamond - Pearl"],
    ["platinum", "Platinum"],
    ["heartgold-soulsilver", "HeartGold - SoulSilver"],
    ["black-white", "Black - White"],
    ["black-2-white-2", "Black 2 - White 2"],
    ["x-y", "X - Y"],
    ["omega-ruby-alpha-sapphire", "Omega Ruby - Alpha Shapphire"],
    ["sun-moon", "Sun - Moon"],
    ["ultra-sun-ultra-moon", "Ultra Sun - Ultra Moon"],
    ["lets-go-pikachu-lets-go-eevee", "Let's Go Pikach"],
    ["sword-shield", "Sword & Shield"],
    ["brilliant-diamond-and-shining-pearl", "Brilliant Diamond - Shining Pearl"],
    ["scarlet-violet", "Scarlet - Violet"]
])

export class PokedexView {

    constructor() {

    }

    async setController(controller) {
        this.controller = controller
    }

    addGridItem(name, type, subtype, artwork) {
        // left
        const gridItem = document.createElement('div')
        const item_content = document.createElement('div')
        const item_content_left = document.createElement('div')
        const item_name_wrapp = document.createElement('div')
        const item_name = document.createElement('p')
        const item_types_wrapp = document.createElement('div')
        const item_type = document.createElement('div')
        const item_type_icon = document.createElement('span')
        const item_type_name = document.createElement('p')
        const item_content_right = document.createElement('div')
        const item_artwork = document.createElement('div')


        gridItem.className = 'pokedex-grid-item'
        gridItem.setAttribute("data-name", name);
        item_content.className = 'pokedex-grid-item-content'
        item_content_left.className = "pokedex-grid-item-content-left"
        item_name_wrapp.className = "pokedex-grid-item-name-wrapp"
        item_name.className = "pokedex-grid-item-name"
        item_types_wrapp.className = "pokedex-grid-item-types-wrapp"
        item_type.className = "pokedex-grid-item-type"
        item_type_icon.className = "pokedex-grid-item-type-icon"
        item_type_name.className = "pokedex-grid-item-type-name"
        item_content_right.className = "pokedex-grid-item-content-right";
        item_artwork.className = 'pokedex-grid-item-artwork';

        gridItem.style.backgroundColor = `var(--${type}-clr-bg-type)`
        item_name.textContent = name
        item_type_name.textContent = type
        item_type_icon.style.background = `url("${IMGS_PATH}${type}type.png") center/80% no-repeat`

        gridItem.appendChild(item_content)
        item_content.append(item_content_left, item_content_right)
        item_name_wrapp.appendChild(item_name)
        item_content_left.append(item_name_wrapp, item_types_wrapp)
        item_type.append(item_type_icon, item_type_name)
        item_types_wrapp.appendChild(item_type)
        GRID.appendChild(gridItem)

        if (subtype) {
            const item_subtypes_wrapp = document.createElement('div')
            const item_subtype = document.createElement('div')
            const item_subtype_icon = document.createElement('span')
            const item_subtype_name = document.createElement('p')

            item_subtypes_wrapp.className = "pokedex-grid-item-subtypes-wrapp"
            item_subtype_icon.className = "pokedex-grid-item-subtype-icon"
            item_subtype_name.className = "pokedex-grid-item-subtype-name"
            item_subtype.className = "pokedex-grid-item-subtype"

            item_subtype_icon.style.background = `url("${IMGS_PATH}${subtype}type.png") center/80% no-repeat`
            item_subtype.style.backgroundColor = `var(--${subtype}-clr-bg-type)`
            item_subtype_name.textContent = subtype

            item_subtype.append(item_subtype_icon, item_subtype_name)
            item_types_wrapp.appendChild(item_subtype)
        }

        item_artwork.style.backgroundImage = "url('" + artwork + "')";
        item_content_right.appendChild(item_artwork);

        gridItem.addEventListener('click', () => this.controller.loadPokemonDetail(name));
    }

    updatePokemonDetail(p) {
        // document.documentElement.style.setProperty("--pokemon-detail-title-bg-clr", `var(--${p.type}-clr-bg-type)`);

        // Update Left
        this.updatePokemonDetailLeft(p)

        // Right
        this.updatePokemonDetailRight(p)
    }

    updatePokemonDetailLeft(p) {
        POK_DET_MODEL_LEFT.classList.add(classMapDetailLeftTypeBg.get(p.type));

        const paddedNumber = p.id.toString().padStart(3, '0');
        document.querySelector(".pokemon-detail-number").textContent = `#${paddedNumber}`;

        document.querySelector(".pokemon-detail-name").textContent = p.name.replace("-", " ")
        document.querySelector(".pokemon-detail-artwork").style.background = `url(${p.artwork}) bottom/90% no-repeat`;
        document.querySelector(".pokemon-detail-type-icon").style.background = `url("${IMGS_PATH}${p.type}type.png") center/80% no-repeat`;

        POK_DET_TYPE_NAME.textContent = p.type
        POK_DET_TYPE.style.backgroundColor = `var(--${p.type}-clr-bg-type)`;
        if (p.subtype == null)
            POK_DET_SUBTYPE.style.display = "none";
        else {
            POK_DET_SUBTYPE.style.display = "flex";
            POK_DET_SUBTYPE_NAME.textContent = p.subtype
            POK_DET_SUBTYPE.style.backgroundColor = `var(--${p.subtype}-clr-bg-type)`;
            document.querySelector(".pokemon-detail-subtype-icon").style.background = `url("${IMGS_PATH}${p.subtype}type.png") center/80% no-repeat`;
        }

        document.querySelector(".pokemon-detail-bst").style.background =
            `radial-gradient(closest-side, white 90%, transparent 95%),
                conic-gradient(var(--${p.type}-clr-bg-type) ${Math.round((p.bst * 100) / 1000)}%, white 0)`;

    }

    updatePokemonDetailRight(p) {
        this.updatePokemonAboutPanel(p)
        this.updatePokemonStatsPanel(p)
        this.updatePokemonMovesPanel(p)
    }

    // About
    updatePokemonAboutPanel(p) {
        this.updatePokemonAboutCard(p)
        this.updatePokemonEggsCard(p)
        this.updatePokemonAbilitiesCard(p)
        this.updatePokemonEvolutionsCard(p)
    }

    updatePokemonAboutCard(p) {
        document.querySelector(".pokemon-height-value").textContent = ((p.height / 10) + " m")
        document.querySelector(".pokemon-weight-value").textContent = ((p.weight / 10) + " Kg")
        document.querySelector(".pokemon-about-card-about-desc").textContent = p.description

        document.querySelector(".pokemon-about-card-about-type-icon").style.background = `url("${IMGS_PATH}${p.type}type.png") center/90% no-repeat`;
        document.querySelector(".pokemon-about-card-about-type").style.backgroundColor = `var(--${p.type}-clr-bg-type)`;
        if (p.subtype == null)
            document.querySelector(".pokemon-about-card-about-subtype").style.display = "none";
        else {
            document.querySelector(".pokemon-about-card-about-subtype").style.display = "block";
            document.querySelector(".pokemon-about-card-about-subtype").style.backgroundColor = `var(--${p.subtype}-clr-bg-type)`;
            document.querySelector(".pokemon-about-card-about-subtype-icon").style.background = `url("${IMGS_PATH}${p.subtype}type.png") center/80% no-repeat`;
        }
        document.querySelector(".pokemon-about-card-about-genus").textContent = p.genus
    }

    updatePokemonEggsCard(p) {
        if (p.eggs && p.eggs.length > 0) {
            document.querySelector(".egg-group-first").textContent = p.eggs[0].replace("-", " ")
            document.querySelector(".egg-group-first").style.backgroundColor = colorMapEggGroupsColor.get(p.eggs[0])

            if (p.eggs[1]) {
                document.querySelector(".egg-group-second").style.display = "initial"
                document.querySelector(".egg-group-second").textContent = p.eggs[1].replace("-", " ")
                document.querySelector(".egg-group-second").style.backgroundColor = colorMapEggGroupsColor.get(p.eggs[1])
            } else
                document.querySelector(".egg-group-second").style.display = "none"
        }

        if (p.cycles)
            document.querySelector(".egg-cycle-value").textContent = `${p.cycles} cycles: ${p.cycles * 257} steps`
    }

    updatePokemonAbilitiesCard(p) {
        const mainDOM = document.querySelector(".pokemon-ability-main")
        const hiddenDOM = document.querySelector(".pokemon-ability-hidden")

        // document.querySelector(".pokemon-ability-main-wrapp").style.backgroundColor = `var(--${p.type}-clr-bg-type)`

        if (p.ability.length > 1)
            mainDOM.textContent = `${p.ability[0].replace("-", " ")} or ${p.ability[1].replace("-", " ")}`
        else
            mainDOM.textContent = p.ability[0].replace("-", " ")

        if (p.hability) {
            // document.querySelector(".pokemon-ability-hidden-wrapp").style.backgroundColor = `var(--${p.type}-clr-bg-type)`
            document.querySelector(".pokemon-ability-hidden-wrapp").style.display = "flex"
            hiddenDOM.textContent = p.hability.replace("-", " ")
        } else
            document.querySelector(".pokemon-ability-hidden-wrapp").style.display = "none"
    }

    updatePokemonEvolutionsCard(p) {
        let evo_card_content = document.querySelector(".pokemon-evolutions-card-content")
        evo_card_content.innerHTML = ""

        p.evolutions.forEach(el => {
            let evo_item = document.createElement("div")
            evo_item.className = "evolution-item"

            let evo_arrow = document.createElement("div")
            evo_arrow.className = "evolution-separator"

            let trigger_hover = document.createElement("div")
            trigger_hover.className = "evolution-trigger-hover"

            let evo_trigger = document.createElement("p")
            evo_trigger.className = "evolution-trigger"
            switch (el.trigger) {
                case "level-up":
                    if (el.level) {
                        evo_trigger.textContent = `lv${el.level}`
                        trigger_hover.textContent = `Levels up at level ${el.level}`
                    }
                    else {
                        evo_trigger.style.background = `url("${ICONS_PATH}happiness.png") center/80% no-repeat`
                        trigger_hover.textContent = `Levels up at ${el.happiness} happiness`
                    }
                    break;
                case "use-item":
                    evo_trigger.style.background = `url("${el.item.sprite}") center/contain no-repeat`
                    trigger_hover.textContent = el.item.name.replace("-", " ")
                    break;
                case "trade":
                    evo_trigger.style.background = `url("${ICONS_PATH}trade.png") center/80% no-repeat`
                    trigger_hover.textContent = `Levels up with trades`
                    break;
                default:
                    evo_trigger = document.createElement("div")
            }
            evo_trigger.appendChild(trigger_hover)
            evo_arrow.appendChild(evo_trigger)
            evo_card_content.appendChild(evo_arrow)

            let evo_item_circle = document.createElement("div")
            evo_item_circle.className = "evolution-item-circle"
            evo_item.appendChild(evo_item_circle)

            let evo_artwork = document.createElement("div")
            evo_artwork.className = "evolution-artwok"
            evo_artwork.style.background = `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${el.id}.png") center/contain no-repeat`
            evo_item_circle.appendChild(evo_artwork)

            let evo_name = document.createElement("p")
            evo_name.className = "evolution-name"
            evo_name.textContent = el.name
            evo_item.appendChild(evo_name)

            evo_card_content.appendChild(evo_item)
        });
    }

    // Stats
    updatePokemonStatsPanel(p) {
        this.updatePokemonStatsCard(p)
        this.updatePokemonWeaknesses(p)
    }

    updatePokemonStatsCard(p) {
        document.querySelectorAll(".pokemon-stat-bar-fill").forEach(bar => bar.style.backgroundColor = `var(--${p.type}-clr-bg-type)`)

        document.querySelector(".hp-bar-stat").style.width = `${(p.hp * 100) / 250}%`
        document.querySelector(".hp-value").textContent = p.hp

        document.querySelector(".attk-bar-stat").style.width = `${(p.attack * 100) / 250}%`
        document.querySelector(".attk-value").textContent = p.attack

        document.querySelector(".def-bar-stat").style.width = `${(p.defense * 100) / 250}%`
        document.querySelector(".def-value").textContent = p.defense

        document.querySelector(".spdef-bar-stat").style.width = `${(p.spDefense * 100) / 250}%`
        document.querySelector(".spdef-value").textContent = p.spDefense

        document.querySelector(".spattk-bar-stat").style.width = `${(p.spAttack * 100) / 250}%`
        document.querySelector(".spattk-value").textContent = p.spAttack

        document.querySelector(".speed-bar-stat").style.width = `${(p.speed * 100) / 250}%`
        document.querySelector(".speed-value").textContent = p.speed

        document.querySelector(".pokemon-bst-value").textContent = p.bst
    }

    createEffectivenessItem(el) {
        const p_eff_item = document.createElement("div")
        const p_eff_ico_type = document.createElement("div");
        const p_eff_ico_type_hover = document.createElement("p");

        p_eff_item.className = "pokemon-effectiveness-item";
        p_eff_ico_type.className = "pokemon-effectiveness-icon-type";
        p_eff_ico_type_hover.className = "pokemon-effectiveness-icon-type-hover";

        p_eff_item.style.backgroundColor = `var(--${el}-clr-bg-type)`
        p_eff_ico_type.style.background = `url("${IMGS_PATH}${el}type.png") center/75% no-repeat`;
        p_eff_ico_type_hover.textContent = el

        p_eff_item.append(p_eff_ico_type, p_eff_ico_type_hover);
        return p_eff_item;
    }

    updatePokemonWeaknesses(p) {
        const STRONGLY_WEAK_LIST = document.querySelector(".pokemon-effectiveness-list.strongly-weak_list");
        const WEAK_LIST = document.querySelector(".pokemon-effectiveness-list.weak_list");
        const NORMALLY_LIST = document.querySelector(".pokemon-effectiveness-list.normal_list");
        const RESISTANT_LIST = document.querySelector(".pokemon-effectiveness-list.resistant_list");
        const IMMUNE_LIST = document.querySelector(".pokemon-effectiveness-list.immune_list");

        STRONGLY_WEAK_LIST.innerHTML = ""
        WEAK_LIST.innerHTML = ""
        NORMALLY_LIST.innerHTML = ""
        RESISTANT_LIST.innerHTML = ""
        IMMUNE_LIST.innerHTML = ""

        if (p.effectiveness.get("4x").length > 0) {
            document.querySelector(".strongly-weak_section").style.display = "flex"
            p.effectiveness.get("4x").forEach(el => {
                const p_eff_item = this.createEffectivenessItem(el);
                STRONGLY_WEAK_LIST.appendChild(p_eff_item);
            });
        } else
            document.querySelector(".strongly-weak_section").style.display = "none"

        if (p.effectiveness.get("2x").length > 0) {
            document.querySelector(".weak_section").style.display = "flex"
            p.effectiveness.get("2x").forEach(el => {
                const p_eff_item = this.createEffectivenessItem(el);
                WEAK_LIST.appendChild(p_eff_item);
            });
        } else
            document.querySelector(".weak_section").style.display = "none"

        if (p.effectiveness.get("1x").length > 0) {
            document.querySelector(".normal_section").style.display = "flex"
            p.effectiveness.get("1x").forEach(el => {
                const p_eff_item = this.createEffectivenessItem(el);
                NORMALLY_LIST.appendChild(p_eff_item);
            });
        } else
            document.querySelector(".normal_section").style.display = "none"

        if (p.effectiveness.get("05x").length > 0) {
            document.querySelector(".resistant_section").style.display = "flex"
            p.effectiveness.get("05x").forEach(el => {
                const p_eff_item = this.createEffectivenessItem(el);
                RESISTANT_LIST.appendChild(p_eff_item);
            });
        } else
            document.querySelector(".resistant_section").style.display = "none"

        if (p.effectiveness.get("0x").length > 0) {
            document.querySelector(".immune_section").style.display = "flex"
            p.effectiveness.get("0x").forEach(el => {
                const p_eff_item = this.createEffectivenessItem(el);
                IMMUNE_LIST.appendChild(p_eff_item);
            });
        } else
            document.querySelector(".immune_section").style.display = "none"
    }

    // Moves
    updatePokemonMovesPanel(p) {
        this.updateTableMoves(p)
    }

    updateTableMoves(p) {
        function getMachineID(moveName) {
            const res = machineMap.get(moveName)
            if (res)
                return res[Pokedex.moves_game_opt] ?? "N/D"

            return "N/D"
        }


        document.querySelector(".gen-filter-name").textContent = filterValToTextMap.get(Pokedex.moves_game_opt)
        MOVES_TABLE_BODY.textContent = ""
        const MOVES = p.moves.get(Pokedex.moves_game_opt)[Pokedex.moves_cat_filter]
        function createTableCell(className) {
            const tableCell = document.createElement("div");
            tableCell.classList.add("pokemon-move-cell", className);
            return tableCell;
        }

        if (MOVES.length > 0) {
            MOVES_TABLE_WRAPP.classList.remove("emtpy_table")
            for (const move of MOVES) {
                const tableItem = document.createElement("div");
                tableItem.classList.add("pokemon-moves-table-item");

                const tableCellLv = createTableCell("move-cell-lv-val");
                const tableCellMove = createTableCell("move-cell-move-val");
                const tableCellTypeCat = createTableCell("move-cell-typecat-val");
                const tableCellPwr = createTableCell("move-cell-pwr-val");
                const tableCellAcc = createTableCell("move-cell-acc-val");
                const tableCellPP = createTableCell("move-cell-pp-val");

                switch (Pokedex.moves_cat_filter) {
                    case "level-up":
                        document.getElementById("moves-table-head-lv").style.display = "table-cell"
                        document.getElementById("moves-table-head-lv").textContent = "Lv"
                        tableCellLv.textContent = move.level
                        tableItem.appendChild(tableCellLv)
                        break;
                    case "machine":
                        document.getElementById("moves-table-head-lv").style.display = "table-cell"
                        document.getElementById("moves-table-head-lv").textContent = "ID"
                        tableCellLv.textContent = getMachineID(move.name)
                        tableItem.appendChild(tableCellLv)
                        break;
                    case "egg":
                    case "tutor":
                        document.getElementById("moves-table-head-lv").style.display = "none"
                        break;
                    default:
                        break;
                }

                tableCellMove.textContent = move.name.replace("-", " ")
                tableCellPwr.textContent = move.power ?? "-"
                tableCellAcc.textContent = move.accuracy ?? "-"
                tableCellPP.textContent = move.pp ?? "-"

                const moveCellTypeWrapp = document.createElement("div")
                moveCellTypeWrapp.classList.add("move-cell-move-type-wrapp")
                moveCellTypeWrapp.style.backgroundColor = `var(--${move.type}-clr-bg-type)`;
                tableCellTypeCat.appendChild(moveCellTypeWrapp)

                const moveCellType = document.createElement("div")
                moveCellType.classList.add("move-cell-move-type")
                moveCellTypeWrapp.appendChild(moveCellType)
                moveCellType.style.background = `url("${IMGS_PATH}${move.type}type.png") center/70% no-repeat`;

                const moveCellCatWrapp = document.createElement("div")
                moveCellCatWrapp.classList.add("move-cell-move-cat-wrapp")
                tableCellTypeCat.appendChild(moveCellCatWrapp)

                const moveCellCat = document.createElement("div")
                moveCellCat.classList.add("move-cell-move-cat")
                moveCellCat.style.background = `url("${IMGS_PATH}${move.category}.png") center/90% no-repeat`;
                moveCellCatWrapp.appendChild(moveCellCat)

                tableItem.append(tableCellMove, tableCellTypeCat, tableCellPwr, tableCellAcc, tableCellPP)
                MOVES_TABLE_BODY.appendChild(tableItem);
            }
        } else {
            MOVES_TABLE_WRAPP.classList.add("emtpy_table")

            const table_empty_message = document.createElement("div")
            table_empty_message.classList.add("pokemon-moves-table-empty-message")
            table_empty_message.textContent = "No Moves found for this selection"
            MOVES_TABLE_BODY.appendChild(table_empty_message)
        }
    }

    // 

    showPokeDetail() {
        // Show Detail window
        POK_DET_MODEL.classList.add("pokemon-detail-show")
    }

    hidePokeDetail() {
        document.querySelector(".pokemon-detail-modal").classList.remove("pokemon-detail-show")
        setTimeout(() => {
            this.cleanPokeDetail()
        }, 450);
    }

    cleanPokeDetail() {
        POK_DET_MODEL_LEFT.classList.forEach(function (className) {
            if (className.match(/(\S+-bg)/g))
                POK_DET_MODEL_LEFT.classList.remove(className);
        });

        // POK_DET_TYPE.classList.forEach(function (className) {
        //     if (className.match(/(\S+-bg)/g))
        //         POK_DET_TYPE.classList.remove(className);
        // });

        // POK_DET_SUBTYPE.classList.forEach(function (className) {
        //     if (className.match(/(\S+-bg)/g))
        //         POK_DET_SUBTYPE.classList.remove(className);
        // });
    }

    onPokemonSearch() {
        removeAllChild(RESULTS_DOM)

        const textIn = document.querySelector(".pokedex-search").value.replace(" ", "-")
        const resMap = new Array();

        if (textIn == "")
            return

        var regex = new RegExp("^" + textIn, "i");

        for (let i = 0, k = 0; i < pokemonList.length && k < 5; i++) {
            if (regex.test(pokemonList[i])) {
                const paddedNumber = (i + 1).toString().padStart(3, '0');
                resMap.push({
                    name: pokemonList[i],
                    artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`,
                    number: `#${paddedNumber}`
                })
                k++;
            }
        }

        resMap.forEach((val, index) => {
            var result_item = document.createElement('div')
            result_item.className = "pokedex-search-result";

            var result_item_artwork = document.createElement('div')
            result_item_artwork.className = "pokedex-search-result-artwork"
            result_item_artwork.style.background = `url("${val.artwork}") center/contain no-repeat`;

            var result_item_middle = document.createElement('div')
            result_item_middle.className = "pokedex-search-result-middle"

            var result_item_number = document.createElement('p')
            result_item_number.className = "pokedex-search-result-number"
            result_item_number.textContent = val.number
            result_item_middle.appendChild(result_item_number)

            var result_item_name = document.createElement('p')
            result_item_name.className = "pokedex-search-result-name"
            result_item_name.textContent = val.name.replace("-", " ")

            result_item_middle.appendChild(result_item_name)

            result_item.appendChild(result_item_artwork)
            result_item.appendChild(result_item_middle)
            result_item.addEventListener("click", async function () {
                document.querySelector(".pokedex-search").value = ""
                removeAllChild(RESULTS_DOM)
                await this.controller.loadPokemonDetail(val.name);
            }.bind(this));

            RESULTS_DOM.appendChild(result_item)
        });

    }

    changeFrontPanel(navitem) {
        this.hideAllPanel()
        document.querySelector(`.${navitem.getAttribute("data-type")}`).classList.remove("hide-detail-panel")

        navitem.classList.add("active_nav_item")
    }

    hideAllPanel() {
        document.querySelectorAll(".pokemon-detail-panel").forEach((el) => el.classList.add("hide-detail-panel"))
        document.querySelectorAll(".pokemon-detail-nav-item").forEach((el) => el.classList.remove("active_nav_item"))
    }

    showMovesFilterOptions() {
        document.querySelector(".gen-selector-filter").classList.toggle("show-options")
    }

    // Errors
    showErrorGrid(error) {
        const grid_error = document.createElement("p")
        grid_error.classList.add("grid_api_error")
        grid_error.textContent = error
        document.querySelector(".modal_pokedex .modal-content").appendChild(grid_error)
    }
}
