import { getRandomNumber } from 'utils/randomizer.util'
import { pokemonFormatterFromPokeApi } from 'utils/poke-formatter.util'
/**
 * Service class for interacting with the PokeAPI to retrieve Pokemon data.
 */
export default class PokeApiService {
  /**
   * Retrieves a randomly generated Pokemon from the PokeAPI.
   *
   * @returns {Promise<Object>} - A Promise that resolves to the formatted Pokemon object.
   * @throws {Error} - If there is an error retrieving the Pokemon data.
   */
  static async getRandomPokemon() {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${getRandomNumber()}`,
        {
          method: 'GET',
        }
      )
      const data = await res.json()

      return pokemonFormatterFromPokeApi({ data })
    } catch (error) {
      return new Error('Internal server error', error.toString())
    }
  }
}
