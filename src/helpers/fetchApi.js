/**

    Performs an asynchronous API request.
    @param {string} params.path - The path of the API endpoint.
    @param {Object} [params.body] - The request body (optional).
    @param {string} [params.method='GET'] - The HTTP method (default: 'GET').
    @property {Object} data - The parsed response data.
    @property {number} statusCode - The HTTP status code of the response.
    */
export async function fetchApi({ path, body, method = 'GET' }) {
  const options = {
    method,
  }

  if (body !== undefined) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_PATH}/${path}`,
    options
  )

  const parsedResponse = await response.json()

  return {
    data: parsedResponse,
    statusCode: response.status,
  }
}
