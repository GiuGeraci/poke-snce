import { z } from 'zod'
import { type } from './types'
import { ability } from './abilities'

export const pokemonEntity = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  img_url: z.string().url(),
  team_id: z.number(),
  status: z.string(),
  created_at: z.date(),
  last_update: z.date(),
})

export const pokemonWithAbilitiesAndTypes = pokemonEntity.extend({
  pokemonAbilities: z.array(type),
  pokemonTypes: z.array(ability),
})
