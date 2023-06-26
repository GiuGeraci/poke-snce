import prisma from 'lib/prisma'
import {
  appendFiltersToSearchTeamQuery,
  includeAbilitiesAndTypesInPokemon,
} from 'utils/query.util'
import { formatTeams } from 'utils/poke-formatter.util'
/**
 * Service class for interacting with team-related functionality.
 */
export default class TeamService {
  /**
   * Creates a new team with the specified name and trainer ID.
   *
   * @param {Object} params - The parameters for creating the team.
   * @param {string} params.name - The name of the team.
   * @param {number} params.trainer_id - The ID of the trainer associated with the team.
   * @returns {Promise<Object>} - A Promise that resolves to the created team object.
   * @throws {Error} - If there is an error creating the team.
   */
  static async createTeam({ name, trainer_id }) {
    try {
      return await prisma.team.create({ data: { name, trainer_id } })
    } catch (error) {
      console.error('Error creating team:', error)
      throw new Error('Failed to create team.')
    }
  }

  /**
   * Retrieves the team with the specified team ID.
   *
   * @param {number} params.team_id - The ID of the team to retrieve.
   * @returns {Promise<Object>} - A Promise that resolves to the team object.
   * @throws {Error} - If there is an error retrieving the team.
   */
  static async getTeamById({ team_id }) {
    try {
      const team = await prisma.team.findUnique({
        where: { id: team_id },
      })
      return team
    } catch (error) {
      console.error('Error retrieving team:', error)
      throw new Error('Failed to retrieve team.')
    }
  }

  /**
   * Updates the team identified by the given team ID.
   *
   *
   * @param params.team_id The ID of the team to update.
   * @param params.fields    An object containing the new value to be replaced
   * @return The updated team object with the modified data.
   * @throws Error If there is an error updating the team data.
   */
  static async updateTeam({ team_id, fields }) {
    try {
      const updatedTeam = await prisma.team.update({
        where: {
          id: team_id,
        },
        data: {
          ...fields,
          last_update: new Date(),
        },
      })
      return updatedTeam
    } catch (error) {
      console.error('Error updating team', error)
      throw new Error('Failed to update team.')
    }
  }

  /**
   *
   *  Retrieves teams based on specified filters.
   *  @param {number} filters.trainer_id - The trainer ID.
   *  @param {Array<number>} filters.abilities - The abilities IDs.
   *  @param {Array<number>} filters.types - The types IDs.
   *  @returns {Promise<Array<Object>>} - A promise that resolves to an array of teams.
   *  @throws {Error} - If there is an error retrieving teams.
   */
  static async getTeamsByFilters({ trainer_id, abilities, types }) {
    const some = appendFiltersToSearchTeamQuery({ abilities, types })
    try {
      const rawTeams = await prisma.team.findMany({
        where: {
          trainer_id,
          pokemon: {
            some,
          },
        },
        include: {
          pokemon: {
            include: includeAbilitiesAndTypesInPokemon,
          },
        },
      })
      const teams = formatTeams({ rawTeams })
      return teams
    } catch (error) {
      console.error('Error retrieving teams:', error)
      throw new Error('Failed to retrieve teams.')
    }
  }

  /**
   *  Checks whether a team is full, based on the number of Pokémon it contains.
   *
   *  @param {number} params.team_id - The ID of the team to check.
   *  @returns {Promise<boolean>} - A Promise that resolves to true if the team is full (contains 6 or more Pokémon), or false otherwise.
   *  @throws {Error} - If there is an error checking the team capacity.
   */
  static async isTeamFull({ team_id }) {
    try {
      const pokemonCount = await prisma.pokemon.count({
        where: {
          team_id,
        },
      })
      return pokemonCount >= 6
    } catch (error) {
      console.error('Error checking team capacity:', error)
      throw new Error('Failed to check team capacity.')
    }
  }
}
