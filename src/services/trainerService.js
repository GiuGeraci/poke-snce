import prisma from 'lib/prisma'

/**
 * Service class for interacting with trainer-related functionality.
 */
export default class TrainerService {
  /**
   * Retrieves the trainer from the database.
   *
   * @returns {Promise<Object>} - A Promise that resolves to the trainer object.
   * @throws {Error} - If there is an error retrieving the trainer.
   */
  static async getTrainer() {
    try {
      return await prisma.trainer.findFirst()
    } catch (error) {
      console.error('Error retrieving trainer:', error)
      throw new Error('Failed to retrieve trainer.')
    }
  }
}
