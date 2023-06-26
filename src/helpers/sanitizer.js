/**
 * Sanitizes the search teams query parameters.
 *
 * @param   {Object} queryParams - The search teams query parameters.
 * @returns {Object} Object containing the sanitized abilities, types, and trainer ID.
 */
export function sanitizeSearchTeamsParams({ queryParams }) {
  const { abilities = null, types = null, trainer_id } = queryParams
  let abilitiesIds = abilities && abilities.map((id) => parseInt(id))
  let typesIds = types && types.map((id) => parseInt(id))

  return {
    abilities: abilitiesIds,
    types: typesIds,
    trainer_id: parseInt(trainer_id),
  }
}
