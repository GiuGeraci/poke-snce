import { z } from 'zod'

export const type = z.object({
  id: z.number(),
  name: z.string(),
})

export const typeList = z.array(type)
