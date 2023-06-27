'use client'

import { createContext } from 'react'
const trainerDefaultContext = {
  trainer: { id: 1 },
}
export const TrainerContext = createContext(trainerDefaultContext)

export function TrainerProvider({ children, trainer }) {
  return (
    <TrainerContext.Provider value={trainer}>
      {children}
    </TrainerContext.Provider>
  )
}
