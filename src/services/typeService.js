import prisma from 'lib/prisma'

/**
 * Service class for interacting with type-related functionality.
 */
export default class TypeService {
  /**
   * Retrieves a list of types from the database.
   *
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of type objects with "id" and "name" properties.
   * @throws {Error} - If there is an error retrieving the types.
   */
  static async getTypes() {
    try {
      const types = await prisma.type.findMany()
      return types.map(({ id, name }) => ({
        id,
        name,
      }))
    } catch (error) {
      console.error('Error retrieving types:', error)
      throw new Error('Failed to retrieve types.')
    }
  }
}
