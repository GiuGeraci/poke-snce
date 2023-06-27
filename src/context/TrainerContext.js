'use client'

import { createContext, useContext } from 'react'
const trainerDefaultContext = {
  trainer: { id: 1, username: '' },
}
export const TrainerContext = createContext(trainerDefaultContext)

export function useTrainer() {
  return useContext(TrainerContext)
}

export function TrainerProvider({ children, trainer }) {
  return (
    <TrainerContext.Provider value={trainer}>
      {children}
    </TrainerContext.Provider>
  )
}
