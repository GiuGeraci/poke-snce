import { NextResponse } from 'next/server'

const errorMessages = {
  BadRequest: {
    message: 'Bad Request',
    status: 400,
  },
  Unauthorized: {
    message: 'Unauthorized',
    status: 401,
  },
  Forbidden: {
    message: 'Forbidden',
    status: 403,
  },
  NotFound: {
    message: 'Not Found',
    status: 404,
  },
  UnprocessableContent: {
    message: 'Unprocessable Content',
    status: 422,
  },
  InternalServerError: {
    message: 'Internal Server Error',
    status: 500,
  },
}

/**
 *
 *  Handles errors and returns an appropriate response.
 *  @param {string} errorType - The type of the error.
 *  @throws {Error} - If the provided error type is unknown.
 *  @returns {NextResponse} - The error response with the corresponding error message and status.
 */
export function handleError(errorType) {
  const error = errorMessages[errorType]

  if (!error) {
    throw new Error(`Unknown error type: ${errorType}`)
  }

  return NextResponse.json({ error: error.message }, { status: error.status })
}
