import 'jest'
import { requestPokemon } from '../request-pokemon'

describe('Battle', () => {

    test('Request Charmander', async () => {
        
        const pokemon = await requestPokemon(4)
        expect(pokemon.name).toMatch(/charmander/)

    })

})