import prisma from 'lib/prisma'
import PokemonApiService from 'services/pokemonApiService'
import TeamService from './teamService'
import { includeAbilitiesAndTypesInPokemon } from 'utils/query.util'
import { pokemonFormatter } from 'utils/poke-formatter.util'

/**
 * Service class for interacting with Pokemon-related functionality.
 */
export default class PokemonService {
  /**
   * Adds a randomly generated Pokemon to a team identified by the given "team_id".
   *
   * @param {Object} params - The parameters for adding a Pokemon to a team.
   * @param {number} params.team_id - The ID of the team to add the Pokemon to.
   * @returns {Promise<Object>} - A Promise that resolves to the formatted Pokemon object added to the team.
   * @throws {Error} - If there is an error adding the Pokemon to the team.
   */
  static async addPokemonToTeam({ team_id }) {
    try {
      let pokemon = false
      const isTeamFull = await TeamService.isTeamFull({ team_id })
      if (isTeamFull) {
        return pokemon
      }
      const randomPokemon = await PokemonApiService.getRandomPokemon()
      const { abilities, types, base_experience, img_url, name } = randomPokemon
      pokemon = await prisma.pokemon.create({
        data: {
          base_experience,
          img_url,
          name,
          team_id,
          pokemon_ability: {
            create: abilities.map(({ ability }) => ({
              ability: {
                connectOrCreate: {
                  where: { name: ability.name },
                  create: { name: ability.name },
                },
              },
            })),
          },
          pokemon_type: {
            create: types.map(({ type }) => ({
              type: {
                connectOrCreate: {
                  where: { name: type.name },
                  create: { name: type.name },
                },
              },
            })),
          },
        },
        include: includeAbilitiesAndTypesInPokemon,
      })
      return pokemonFormatter({ pokemon })
    } catch (error) {
      console.error('Error adding pokemon to team:', error)
      throw new Error('Failed to add pokemon to team.')
    }
  }

  /**
   *  Deletes a specific Pokémon from a team based on the given team ID and Pokémon ID.
   *
   *  @param {Object} params - The parameters for deleting a Pokémon from a team.
   *  @param {number} params.team_id - The ID of the team from which to delete the Pokémon.
   *  @param {number} params.pokemon_id - The ID of the Pokémon to delete.
   *  @returns {number} - The count of deleted entities.
   *  @throws {Error} - If the Pokémon is not found in the team or there is an error deleting the Pokémon.
   */
  static async deletePokemonFromTeam({ team_id, pokemon_id }) {
    try {
      const { count } = await prisma.pokemon.deleteMany({
        where: {
          team_id,
          id: pokemon_id,
        },
      })
      return count > 0
    } catch (error) {
      console.error('Error deleting pokemon from team:', error)
      throw new Error(
        `Failed to delete pokemon id: ${pokemon_id} from team id: ${team_id}.`
      )
    }
  }
}
