import { NextResponse } from 'next/server'
import { createTeamBody, editTeamBody } from 'validators/teams'
import { handleError } from './errors'

/**
 * Generates a JSON response based on the provided schema and object.
 *
 * @param {Object} schema - The schema used for validation.
 * @param {Object} object - The object to be validated and returned as a JSON response.
 * @returns {NextResponse} The JSON response.
 */
export function response(schema, object) {
  const keys = Object.keys(object)
  const validate = schema.safeParse(object[keys[0]])

  if (!validate.success) {
    const { errors } = validate.error
    return NextResponse.json({ error: errors }, { status: 500 })
  }

  return NextResponse.json(object)
}

/**
 * Validates the request based on the HTTP method and path.
 *
 * @param {Object} req - The request object.
 * @returns {Promise<void>} A promise that resolves once the request is validated.
 */
export async function validateRequest(req) {
  const {
    method,
    nextUrl: { pathname },
  } = req
  if (method === 'GET' || method === 'DELETE') {
    return
  }
  if (method === 'POST' && pathname === '/api/teams') {
    return await validateData(req, createTeamBody)
  }

  if (method === 'PATCH' && pathname.startsWith('/api/teams')) {
    return await validateData(req, editTeamBody)
  }
}

/**
 * Validates the request data against the provided schema.
 *
 * @param {Object} req - The request object.
 * @param {Object} schema - The schema used for validation.
 * @returns {Promise<void>} A promise that resolves if the data is valid, or throws an error otherwise.
 */
async function validateData(req, schema) {
  const data = await req.json()
  const validation = schema.safeParse(data)

  if (!validation.success) {
    return handleError('UnprocessableContent')
  }
}
