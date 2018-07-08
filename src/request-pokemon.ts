import axios from 'axios'
import { IPokemonAPI } from './pokemon-api.interface'
import { IMove } from './move.interface'

export async function requestPokemon(pokemon: number): Promise<IPokemonAPI>
{
    return (await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)).data
}

export async function requestPower(pokemon: IPokemonAPI): Promise<IMove>
{
    const url = pokemon.moves[0].move.url
    return (await axios.get(url)).data
}
