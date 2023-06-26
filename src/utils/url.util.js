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
