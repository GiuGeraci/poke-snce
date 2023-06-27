import { z } from 'zod'
import { pokemonWithAbilitiesAndTypes } from './pokemon'

export const editTeamBody = z.object({
  name: z.string(),
})

export const createTeamBody = editTeamBody.extend({
  trainer_id: z.number(),
})

export const teamEntity = z.object({
  id: z.number(),
  name: z.string(),
  trainer_id: z.number(),
  status: z.string(),
  created_at: z.date(),
  last_update: z.date(),
})

export const teamExtended = teamEntity.extend({
  pokemon: z.array(pokemonWithAbilitiesAndTypes).optional(),
  total_experience: z.number(),
  types: z.array(z.string()).optional(),
  abilities: z.array(z.string()).optional(),
})

export const teamList = z.array(teamExtended)
