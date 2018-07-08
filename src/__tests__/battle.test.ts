import 'jest'
import axios from 'axios'

import * as pokeMocks from '../mocks/pokemons'
import * as powerMocks from '../mocks/powers'

import { requestPokemon, requestPower } from '../request-pokemon'
import { Pokemon } from '../pokemon'
import { IPokemonAPI } from '../pokemon-api.interface'
import { PokemonMapper } from '../pokemon-mapper'
import { IPokemonMetadata } from '../pokemon-metadata.interface'

jest.mock('axios')

describe('Battle', () => {

	let pokemonAPI: IPokemonAPI
	let pokemons: Array<Pokemon>
    let response: Array<IPokemonAPI>
    let metadata: Array<IPokemonMetadata>
    let charmander: Pokemon
	let bulbasaur: Pokemon

    test('Request Bulbasaur from API', async () => {

		axios.get.mockResolvedValue({ data: pokeMocks.Bulbasaur });

		pokemonAPI = await requestPokemon(1)

		expect(pokemonAPI).toEqual(pokeMocks.Bulbasaur)
		expect(pokemonAPI.name).toMatch(/bulbasaur/)

	})

    test('Request Charmander from API', async () => {

		axios.get.mockResolvedValue({ data: pokeMocks.Charmander });

		pokemonAPI = await requestPokemon(4)

		expect(pokemonAPI).toEqual(pokeMocks.Charmander)
		expect(pokemonAPI.name).toMatch(/charmander/)

    })


	test('Request multiple pokemons from API', async () => {

		axios.get
			.mockResolvedValueOnce({ data: pokeMocks.Bulbasaur })
			.mockResolvedValue({ data: pokeMocks.Charmander })

		response = new Array<IPokemonAPI>(
			await requestPokemon(1),
			await requestPokemon(4)
		)

		response.reduce((previous, current) => {

			expect(previous.name).toMatch(/bulbasaur/)
			expect(current.name).toMatch(/charmander/)

			return current
		})

	})

	test('Request powers from API', async () => {

		axios.get
			.mockResolvedValueOnce({ data: pokeMocks.Bulbasaur })
			.mockResolvedValueOnce({ data: pokeMocks.Charmander })
			.mockResolvedValueOnce({ data: powerMocks.razorWind })
			.mockResolvedValue({ data: powerMocks.flamethrower })

        response = new Array<IPokemonAPI>(
            await requestPokemon(1),
            await requestPokemon(4)
		)

		metadata = await Promise.all(
			response.map(async pokemon => {
				const move = await requestPower(pokemon)
				return { pokemon, move }
			})
		)

		metadata.forEach(meta => expect(Object.keys(meta).length).toBe(2))
		metadata.reduce((previous, current) => {

			expect(previous.move.power).toBe(80)
			expect(current.move.power).toBe(90)

			return current
		})

	})

	test('Pokemon players creation', async () => {

		axios.get
			.mockResolvedValueOnce({ data: pokeMocks.Bulbasaur })
			.mockResolvedValueOnce({ data: pokeMocks.Charmander })
			.mockResolvedValueOnce({ data: powerMocks.razorWind })
			.mockResolvedValue({ data: powerMocks.flamethrower })

        response = new Array<IPokemonAPI>(
            await requestPokemon(1),
            await requestPokemon(4)
		)

		metadata = await Promise.all(
			response.map(async pokemon => {
				const move = await requestPower(pokemon)
				return { pokemon, move }
			})
		)

		pokemons = metadata.map(meta => new PokemonMapper({ ...meta }).map())

		pokemons.reduce((previous, current) => {

			expect(previous).toEqual({
				name: 'bulbasaur',
				power: 80,
				attack: 49,
				defense: 49,
				hp: 45,
				level: 1
			})

			expect(current).toEqual({
				name: 'charmander',
				power: 90,
				attack: 52,
				defense: 43,
				hp: 39,
				level: 1
			})

			return current
		})

	})

    test('Charmander hits Bulbasaur', async () => {

		axios.get
			.mockResolvedValueOnce({ data: pokeMocks.Bulbasaur })
			.mockResolvedValueOnce({ data: pokeMocks.Charmander })
			.mockResolvedValueOnce({ data: powerMocks.razorWind })
			.mockResolvedValue({ data: powerMocks.flamethrower })

        response = new Array<IPokemonAPI>(
            await requestPokemon(1),
            await requestPokemon(4)
		)

		metadata = await Promise.all(
			response.map(async pokemon => {
				const move = await requestPower(pokemon)
				return { pokemon, move }
			})
		)

		pokemons = metadata.map(meta => new PokemonMapper({ ...meta }).map())

		const [ bulbasaur, charmander ] = pokemons

		charmander.hit(bulbasaur)
        expect(bulbasaur.hp).toBe(39)

    })

})
