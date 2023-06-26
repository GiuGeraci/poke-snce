import PokemonService from 'services/pokemonService'
import { pokemonWithAbilitiesAndTypes } from 'validators/pokemon'
import { response } from 'helpers/validator'
import { handleError } from 'helpers/errors'

/**
 * @swagger
 * /api/teams/{team_id}/pokemon:
 *   post:
 *     summary: Add a Pokemon to a team
 *     parameters:
 *       - in: path
 *         name: team_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the team
 *     responses:
 *       200:
 *         description: Pokemon added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pokemon:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     base_experience:
 *                       type: integer
 *                     img_url:
 *                       type: string
 *                     team_id:
 *                       type: integer
 *                     status:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     last_update:
 *                       type: string
 *                       format: date-time
 *                     pokemonAbilities:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                     pokemonTypes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 */
export async function POST(req, { params: { team_id } }) {
  const pokemon = await PokemonService.addPokemonToTeam({
    team_id: parseInt(team_id),
  })
  if (!pokemon) {
    return handleError('Forbidden')
  }
  return response(pokemonWithAbilitiesAndTypes, { pokemon })
}
