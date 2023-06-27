export const fetchApi = async ({ path, body, method = 'GET' }) => {
    const options = {
        method
    }

    if (body !== undefined) {
        options.body = JSON.stringify(body)
    }

    const response = await fetch(`http://localhost:3000/api/${path}`, options)

    const parsedResponse = await response.json()

    return {
        data: parsedResponse,
        statusCode: response.status
    }
  } 