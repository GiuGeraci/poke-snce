import TeamService from 'services/teamService'
import { teamEntity } from 'validators/teams'
import { response } from 'helpers/validator'

/**
 * @swagger
 * /api/steams/{team_id}:
 *   patch:
 *     summary: Updates a specific team by id
 *     parameters:
 *       - in: path
 *         name: team_id
 *         required: true
 *         description: ID of the team to update
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 team:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     trainer_id:
 *                       type: integer
 *                     status:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     last_update:
 *                       type: string
 *                       format: date-time
 */
export async function PATCH(req, { params: { team_id } }) {
  const data = await req.json()
  const team = await TeamService.updateTeam({
    team_id: parseInt(team_id),
    fields: data,
  })
  return response(teamEntity, { team })
}

/**
 * @swagger
 * /teams/{team_id}:
 *   get:
 *     summary: Get a specific team by ID
 *     parameters:
 *       - in: path
 *         name: team_id
 *         required: true
 *         description: ID of the team to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 team:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     trainer_id:
 *                       type: integer
 *                     status:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     last_update:
 *                       type: string
 *                       format: date-time
 */
export async function GET(req, { params: { team_id } }) {
  const team = await TeamService.getTeamById({
    team_id: parseInt(team_id),
  })
  return response(teamEntity, { team })
}
