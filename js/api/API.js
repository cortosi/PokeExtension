const ENDPOINT_POKEMON = "https://pokeapi.co/api/v2/pokemon/"
const ENDPOINT_POKEMON_SPECIES = "https://pokeapi.co/api/v2/pokemon-species/"
const ENDPOINT_MOVE = "https://pokeapi.co/api/v2/move/"
const ENDPOINT_ABILITY = "https://pokeapi.co/api/v2/ability/"
const ENDPOINT_NATURE = "https://pokeapi.co/api/v2/nature/"

export class API {
    /*
        https://pokeapi.co/api/v2/pokemon/{id or name}
    */

    static async pokeApiPokemon(name = "") {
        const RESPONSE = await fetch(`${ENDPOINT_POKEMON}${name}`);

        if (!RESPONSE.ok)
            throw new Error(`[API][ENDPOINT: ${ENDPOINT_POKEMON}] Error while loadign Pokémon n.${name}, Status: ${RESPONSE.status}`);

        return (await RESPONSE.json());
    }

    static async pokeApiPokemonSpecies(name = "") {
        const RESPONSE = await fetch(`${ENDPOINT_POKEMON_SPECIES}${name}`);

        if (!RESPONSE.ok)
            throw new Error(`[API][ENDPOINT: ${ENDPOINT_POKEMON_SPECIES}] Error while loadign Pokémon Species n.${name}, Status: ${RESPONSE.status}`);

        return await RESPONSE.json();
    }

    static async pokeApiEvolutionChain(url) {
        const response = await fetch(url);

        if (!response.ok)
            throw new Error(`[API] Error during contacting endpoint: ${url}, Status: ${response.status}`);

        return await response.json();
    }

    static async pokeApiItem(url = null, id = null) {
        let apiUrl

        if (!url && !id)
            return null

        if (url)
            apiUrl = url;
        else
            apiUrl = `https://pokeapi.co/api/v2/item/${id}`

        const response = await fetch(apiUrl);

        if (!response.ok)
            throw new Error(`[API] Error during contacting endpoint: ${url}, Status: ${response.status}`);

        return await response.json();
    }

    static async pokeApiMove(url = null, id = null) {
        let apiUrl

        if (!url && !id)
            return null

        if (url)
            apiUrl = url;
        else
            apiUrl = `${ENDPOINT_MOVE}${id}`

        const response = await fetch(apiUrl);

        if (!response.ok)
            throw new Error(`[API] Error during contacting endpoint: ${url}, Status: ${response.status}`);

        return await response.json();
    }

    static async pokeApiMachine(url = null, id = null) {
        let apiUrl

        if (!url && !id)
            return null

        if (url)
            apiUrl = url;
        else
            apiUrl = `https://pokeapi.co/api/v2/machine/${id}`

        const response = await fetch(apiUrl);

        if (!response.ok)
            throw new Error(`[API] Error during contacting endpoint: ${url}, Status: ${response.status}`);

        return await response.json();
    }

    static async pokeApiAbility(id) {
        const RESPONSE = await fetch(`${ENDPOINT_ABILITY}${id}`);

        if (!RESPONSE.ok)
            throw new Error(`[API][ENDPOINT: ${ENDPOINT_ABILITY}] Error while loadign Ability n.${name}, Status: ${RESPONSE.status}`);

        return (await RESPONSE.json());
    }

    static async pokeApiNature(id) {
        const RESPONSE = await fetch(`${ENDPOINT_NATURE}${id}`);

        if (!RESPONSE.ok)
            throw new Error(`[API][ENDPOINT: ${ENDPOINT_NATURE}] Error while loadign Nature n.${name}, Status: ${RESPONSE.status}`);

        return (await RESPONSE.json());
    }
}
