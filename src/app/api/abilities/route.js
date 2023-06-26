import AbilityService from 'services/abilityService'
import { abilityList } from 'validators/abilities'
import { response } from 'helpers/validator'

/**
 * @swagger
 * /api/abilities:
 *   get:
 *     summary: Get all abilities
 *     responses:
 *       200:
 *         description: Abilities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 abilities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 */
export async function GET() {
  const abilities = await AbilityService.getAbilities()
  return response(abilityList, { abilities })
}
