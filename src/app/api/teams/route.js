import TeamService from 'services/teamService'
import { retrieveQueryParams } from 'utils/url.util'
import { handleError } from 'helpers/errors'
import { sanitizeSearchTeamsParams } from 'helpers/sanitizer'
import { teamEntity, teamList } from 'validators/teams'
import { response } from 'helpers/validator'

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create a new team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team created successfully
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
export async function POST(req) {
  const data = await req.json()
  const createdTeam = await TeamService.createTeam(data)
  return response(teamEntity, { createdTeam })
}

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Get teams by filters
 *     parameters:
 *       - in: query
 *         name: trainer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the trainer
 *       - in: query
 *         name: ability_id
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs of abilities to filter by
 *       - in: query
 *         name: type_id
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs of types to filter by
 *     responses:
 *       200:
 *         description: Teams retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       trainer_id:
 *                         type: integer
 *                       status:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       last_update:
 *                         type: string
 *                         format: date-time
 *                       total_experience:
 *                         type: integer
 *                       pokemon:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *                             base_experience:
 *                               type: integer
 *                             img_url:
 *                               type: string
 *                             team_id:
 *                               type: integer
 *                             status:
 *                               type: string
 *                             created_at:
 *                               type: string
 *                               format: date-time
 *                             last_update:
 *                               type: string
 *                               format: date-time
 *                             pokemonAbilities:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                   name:
 *                                     type: string
 *                             pokemonTypes:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                   name:
 *                                     type: string
 *                         abilities:
 *                           type: array
 *                           items:
 *                             type: string
 *                         types:
 *                           type: array
 *                           items:
 *                             type: string
 */
export async function GET(req) {
  const queryParams = retrieveQueryParams({ req })
  if (!queryParams?.trainer_id) {
    return handleError('Unauthorized')
  }
  const { abilities, types, trainer_id } = sanitizeSearchTeamsParams({
    queryParams,
  })

  const teams = await TeamService.getTeamsByFilters({
    trainer_id,
    abilities,
    types,
  })
  return response(teamList, { teams })
}
