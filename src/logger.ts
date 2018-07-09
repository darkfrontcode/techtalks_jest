import chalk from 'chalk'
import { Pokemon } from './pokemon'

const log = console.log

export class Logger
{
	private static orange = chalk.hex('#ffa500')
	private static green = chalk.hex('#008000')

	public static fightOff(config: Array<Pokemon>): void
	{
		const [ pokemon1, pokemon2] = config

		log(
			chalk`{magenta >>> FIGHT OFF <<<}`,
			'\n',
			this.green(`${pokemon1.name}: ${String(pokemon1.hp)}`),
			this.orange(`${pokemon2.name}: ${String(pokemon2.hp)}`)
		)
	}

	public static status(config: Array<Pokemon>): void
	{
		const [ pokemon1, pokemon2] = config

		log(
			this.green(`${pokemon1.name}: ${String(pokemon1.hp)}`),
			this.orange(`${pokemon2.name}: ${String(pokemon2.hp)}`)
		)
	}

	public static looser(looser: Pokemon): void
	{
		log(chalk`{red ${looser.name} lost the battle - R.I.P †††}`)
	}
}
