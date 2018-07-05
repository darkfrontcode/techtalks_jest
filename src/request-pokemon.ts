import axios from 'axios'
import { IPokemon } from './pokemon.interface'

export async function requestPokemon(pokemon: number): Promise<IPokemon>
{
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    return result.data
}