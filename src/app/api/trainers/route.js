import TrainerService from 'services/trainerService'
import { trainerEntity } from 'validators/trainers'
import { response } from 'helpers/validator'

/**
 * @swagger
 * /api/trainers:
 *   get:
 *     summary: Get the trainer
 *     responses:
 *       200:
 *         description: Trainer retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trainer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     status:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     last_update:
 *                       type: string
 *                       format: date-time
 */
export async function GET() {
  const trainer = await TrainerService.getTrainer()
  return response(trainerEntity, { trainer })
}
