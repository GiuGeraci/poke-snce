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
