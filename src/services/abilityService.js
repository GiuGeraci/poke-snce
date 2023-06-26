import prisma from 'lib/prisma'

/**
 * Service class for interacting with ability-related functionality.
 */
export default class AbilityService {
  /**
   * Retrieves a list of abilities from the database.
   *
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of ability objects with "id" and "name" properties.
   * @throws {Error} - If there is an error retrieving the abilities.
   */
  static async getAbilities() {
    try {
      const abilities = await prisma.ability.findMany()
      return abilities.map(({ id, name }) => ({
        id,
        name,
      }))
    } catch (error) {
      console.error('Error retrieving abilities:', error)
      throw new Error('Failed to retrieve abilities.')
    }
  }
}
