import { IPlayer } from './player.interface'
import { IPokemonConfig } from './pokemon-config.interface'

export class Pokemon implements IPlayer, IPokemonConfig
{
	public name: string
	public power: number
    public attack: number
    public defense: number
    public hp: number
    public level: number

    constructor(config: IPokemonConfig)
    {
        Object.keys(config).forEach(key => this[key] = config[key])
    }

    public hit(enemy: Pokemon): void
    {
        const a = ((2 * this.level) / 5) + 2
        const b = this.power * ( this.attack / enemy.defense )
        const c = (a * b / 50) + 2

        enemy.damage(Math.floor(c))
    }

    public damage(damage: number): void
    {
        this.hp = Math.max(0, this.hp - damage)
    }
}
