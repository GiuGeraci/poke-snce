import TypeService from 'services/typeService'
import { typeList } from 'validators/types'
import { response } from 'helpers/validator'

/**
 * @swagger
 * /api/types:
 *   get:
 *     summary: Get all types
 *     responses:
 *       200:
 *         description: Types retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 types:
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
  const types = await TypeService.getTypes()
  return response(typeList, { types })
}
