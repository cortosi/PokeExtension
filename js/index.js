import { Pokedex } from "./controller/Pokedex.js"
import { Moves } from "./controller/Moves.js"
import { Abilities } from "./controller/Abilities.js"
import { Natures } from "./controller/Natures.js"
import { Items } from "./controller/Items.js"
import { PokedexView } from "./view/PokedexView.js"
import { MovesView } from "./view/MovesView.js"
import { AbilitiesView } from "./view/AbilitiesView.js"
import { NaturesView } from "./view/NaturesView.js"
import { ItemsView } from "./view/ItemsView.js"

// DOM Items
const MODAL_INNER_EXIT_BTNS = document.querySelectorAll('.modal-exit-btn');
const EXTENSION_MAIN_ROWS = document.querySelectorAll('.extension-main-row');
const CREDITS_BACK = document.querySelector(".credits-back-icon")
const CREDITS_ROW = document.getElementById("row_credits")
const CREDITS_WINDOW = document.querySelector(".credits-window")
const CHANGELOG_BTN = document.querySelector(".changelog-btn")
const CHANGELOG_WINDOW = document.querySelector(".changelog-window")

// Views
const POKEDEX_VIEW = new PokedexView()
const MOVES_VIEW = new MovesView()
const ABILITIES_VIEW = new AbilitiesView()
const NATURES_VIEW = new NaturesView()
const ITEMES_VIEW = new ItemsView()

// Controllers
const POKEDEX_CONTROLLER = new Pokedex(POKEDEX_VIEW)
const MOVES_CONTROLLER = new Moves(MOVES_VIEW)
const ABILITIES_CONTROLLER = new Abilities(ABILITIES_VIEW)
const NATURES_CONTROLLER = new Natures(NATURES_VIEW)
const ITEMS_CONTROLLER = new Items(ITEMES_VIEW)

// Set views' controller
await POKEDEX_VIEW.setController(POKEDEX_CONTROLLER)
await MOVES_VIEW.setController(MOVES_CONTROLLER)
await ABILITIES_VIEW.setController(ABILITIES_CONTROLLER)
await NATURES_VIEW.setController(NATURES_CONTROLLER)
await ITEMES_VIEW.setController(ITEMS_CONTROLLER)

// Init
POKEDEX_CONTROLLER.init()
MOVES_CONTROLLER.init()
ABILITIES_CONTROLLER.init()
NATURES_CONTROLLER.init()
ITEMS_CONTROLLER.init()

// Functions
EXTENSION_MAIN_ROWS.forEach(function (row) {
    row.addEventListener('click', () => showModal(row.getAttribute("data-modal")))
})

MODAL_INNER_EXIT_BTNS.forEach(function (row) {
    row.addEventListener('click', function (e) {
        var modal = e.target.parentNode.parentNode.parentNode;
        if (modal) {
            hideModal(modal);
        }
    });
})

function showModal(modalclass) {
    const SEL_MODAL = document.querySelector(`.${modalclass}`)
    SEL_MODAL.classList.remove("modal-hidden");
    setTimeout(() => {
        SEL_MODAL.classList.add("active-modal");
    }, 0);
}

function hideModal(modal) {
    modal.classList.remove("active-modal");
    setTimeout(() => {
        modal.classList.add("modal-hidden");
    }, 300);
}

// Credits
CREDITS_ROW.addEventListener('click', () => CREDITS_WINDOW.classList.toggle("show-credits"))
CREDITS_BACK.addEventListener('click', () => CREDITS_WINDOW.classList.toggle("show-credits"))

// Changelog
CHANGELOG_BTN.addEventListener('click', () => CHANGELOG_WINDOW.classList.toggle("show-changelog"))
CHANGELOG_WINDOW.addEventListener('click', (event) => event.target.classList.remove("show-changelog"))

// Toolbox
const MODAL_TYPECHART = document.querySelector(".modal_typechart")
document.querySelector(".typechart-grid-icon").addEventListener('click', () => showModal("modal_typechart"))
document.querySelector(".typechart-back-icon").addEventListener('click', () => hideModal(MODAL_TYPECHART))

// let moves = new Map();

// async function loadMoves() {
//     for (let index = 1; index < 905; index++) {
//         let moveName, moveDesc, moveEffect, movePP, movePwr, moveType, moveCat, moveAcc;

//         const moveJSON = await API.pokeApiMove(null, index)

//         moveName = moveJSON.name ?? null;
//         searchLoop: for (let i = 0; i < moveJSON.effect_entries.length; i++) {
//             const el = moveJSON.effect_entries[i];
//             if (el.language.name === "en") {
//                 moveEffect = el.effect.replace("\n", " ");
//                 break searchLoop;
//             }
//         }

//         searchLoop: for (let i = 0; i < moveJSON.flavor_text_entries.length; i++) {
//             const el = moveJSON.flavor_text_entries[i];
//             if (el.language.name === "en") {
//                 moveDesc = el.flavor_text.replace("\n", " ");
//                 break searchLoop;
//             }
//         }

//         if (moveJSON.effect_chance && moveEffect){
//             moveEffect = moveEffect.replace("$effect_chance", moveJSON.effect_chance)
//         }

//         movePP = moveJSON.pp ?? null;
//         movePwr = moveJSON.power ?? null;
//         moveAcc = moveJSON.accuracy ?? null;
//         moveType = moveJSON.type?.name ?? null;
//         moveCat = moveJSON.damage_class?.name ?? null;

//         // Move()
//         moves.set(moveName, new Move(moveName, moveDesc, moveEffect, movePP, movePwr, moveAcc, moveType, moveCat))
//     }

//     console.log(moves)
// }

// await loadMoves()

// Dichiarare una mappa vuota all'inizio del tuo script
// const machines = new Map();

// async function loadMachines() {
//     for (let index = 1; index < 1688; index++) {
//         let machineMoveName, machineGen, machineItemName;

//         const moveJSON = await API.pokeApiMachine(null, index);

//         machineMoveName = moveJSON.move.name ?? null;
//         machineGen = moveJSON.version_group.name ?? null;

//         if (!(machineGen == "xd" || machineGen == "colosseum")) {
//             machineItemName = moveJSON.item.name ?? null;

//             if (!machines.has(machineMoveName)) {
//                 machines.set(machineMoveName, {});
//             }

//             machines.get(machineMoveName)[machineGen] = machineItemName;
//         }
//     }

//     console.log(machines);
// }

// // Chiamare la funzione per caricare le Machine
// loadMachines();

// const abilities = new Array();

// async function loadAbilities() {
//     for (let index = 1; index < 304; index++) {
//         let machineMoveName, machineGen, machineItemName;
//         try {
//             const moveJSON = await API.pokeApiAbility(index);
//             abilities.push(moveJSON.name)
//         }
//         catch (err) {

//         }

//     }

//     console.log(abilities);
// }

// // Chiamare la funzione per caricare le Machine
// loadAbilities();


// const pokemonList = new Array();

// async function loadPokemons() {
//     for (let index = 1; index < 1292; index++) {

//         try {
//             const moveJSON = await API.pokeApiPokemonSpecies(index);
//             pokemonList.push(moveJSON.name)
//         }
//         catch (err) {

//         }

//     }

//     console.log(pokemonList);
// }

// loadPokemons();

// const natureList = new Array();

// async function loadNatures() {
//     for (let index = 1; index < 25; index++) {

//         try {
//             const moveJSON = await API.pokeApiNature(index);
//             natureList.push(moveJSON.name)
//         }
//         catch (err) {
//         }
//     }
//     console.log(natureList);
// }

// loadNatures();

// const itemsList = new Array();

// async function loadItems() {
//     for (let index = 1; index < 2160; index++) {

//         try {
//             const moveJSON = await API.pokeApiItem(null, index);
//             itemsList.push(moveJSON.name)
//         }
//         catch (err) {
//         }
//     }
//     console.log(itemsList);
// }

// loadItems   ();