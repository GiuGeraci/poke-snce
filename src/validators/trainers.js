import { z } from 'zod'

export const trainerEntity = z.object({
  id: z.number(),
  username: z.string(),
  gender: z.string(),
  status: z.string(),
  created_at: z.date(),
  last_update: z.date(),
})
