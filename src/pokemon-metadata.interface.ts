import { IPokemonAPI } from './pokemon-api.interface'
import { IMove } from './move.interface'

export interface IPokemonMetadata
{
	pokemon: IPokemonAPI
	move: IMove
}
