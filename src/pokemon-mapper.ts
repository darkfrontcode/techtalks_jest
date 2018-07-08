import { IMove } from './move.interface'
import { Verbs } from './verbs.enum'
import { Pokemon } from './pokemon'
import { IPokemonAPI } from './pokemon-api.interface'
import { IPokemonMetadata } from './pokemon-metadata.interface'

export class PokemonMapper implements IPokemonMetadata
{
	public pokemon: IPokemonAPI
	public move: IMove

    constructor(metadata: IPokemonMetadata)
    {
		Object.keys(metadata).forEach(key => this[key] = metadata[key])
    }

    public map(): Pokemon
    {
        return new Pokemon({
			name: this.pokemon.name,
            power: this.move.power,
            attack: this.find(Verbs.ATTACK),
            defense: this.find(Verbs.DEFENSE),
            hp: this.find(Verbs.HP),
            level: 1,
        })
    }

    private find(attr: string): number
    {
        return this.pokemon.stats.find(item => item.stat.name === attr).base_stat
    }

}
