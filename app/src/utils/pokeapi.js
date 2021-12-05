import API from './api.js';

export default class pokeAPI {

    static getPokemons = async (limit) => {
        return await API.get("pokemon", {params: {limit:limit}});
    }

    static getPokemon = async (id) => {
        return await API.get(`pokemon/${id.toString()}`);
    }

}
