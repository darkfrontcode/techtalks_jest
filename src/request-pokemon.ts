import axios from 'axios'
import { IPokemonAPI } from './pokemon-api.interface'

export async function requestPokemon(pokemon: number): Promise<IPokemonAPI>
{
    return (await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)).data
}
