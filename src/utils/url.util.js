/**
 *
 * Retrieves query parameters from the provided request object.
 * @param {Object} req - The request object containing query parameters.
 * @returns {Object} - An object representing the query parameters.
 */

export function retrieveQueryParams({ req }) {
  const { nextUrl } = req
  const params = new URLSearchParams(nextUrl.search)
  const queryParams = {}
  params.forEach((value, key) => {
    if (queryParams[key]) {
      queryParams[key].push(value)
    } else {
      queryParams[key] = [value]
    }
  })
  return queryParams
}

/**
 * Builds URLSearchParams object based on the selected abilities, types, and trainer ID.
 *
 * @param {Array<string>} selectedAbilities - The selected abilities.
 * @param {Array<string>} selectedTypes - The selected types.
 * @param {string} trainerId - The trainer ID.
 * @returns {URLSearchParams} - The URLSearchParams object containing the built parameters.
 */
export function buildSearchParams(selectedAbilities, selectedTypes, trainerId) {
  let params = new URLSearchParams()

  selectedAbilities.forEach((id) => {
    params.append('abilities', id)
  })

  selectedTypes.forEach((id) => {
    params.append('types', id)
  })

  params.append('trainer_id', trainerId)

  return params.toString()
}
