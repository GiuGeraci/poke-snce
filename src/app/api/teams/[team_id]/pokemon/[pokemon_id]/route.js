import PokemonService from 'services/pokemonService'
import { response } from 'helpers/validator'
import { message } from 'validators/global'
import { handleError } from 'helpers/errors'

/**
 * @swagger
 * /api/teams/{team_id}/pokemon/{pokemon_id}:
 *   delete:
 *     summary: Delete a Pokemon from a team
 *     parameters:
 *       - in: path
 *         name: team_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the team
 *       - in: path
 *         name: pokemon_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Pokemon to delete
 *     responses:
 *       200:
 *         description: Pokemon deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export async function DELETE(req, { params: { team_id, pokemon_id } }) {
  const is_deleted = await PokemonService.deletePokemonFromTeam({
    team_id: parseInt(team_id),
    pokemon_id: parseInt(pokemon_id),
  })
  if (!is_deleted) {
    return handleError('InternalServerError')
  }
  return response(message, { message: 'Pokemon deleted' })
}
