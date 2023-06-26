import { z } from 'zod'

export const ability = z.object({
  id: z.number(),
  name: z.string(),
})

export const abilityList = z.array(ability)
