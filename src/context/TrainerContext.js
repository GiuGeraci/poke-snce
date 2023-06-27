'use client'

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react'
const trainerDefaultContext = {
  trainer: { id: 1, username: '' },
  setTrainer: () => {},
}
export const TrainerContext = createContext(trainerDefaultContext)

export function useTrainer() {
  return useContext(TrainerContext)
}

export function TrainerProvider({ children, trainer_prop = {} }) {
  const [trainer, setTrainer] = useState(trainer_prop)
  
  const setCurrentTrainer = useCallback((trainer) => {
    setTrainer(trainer)
  }, [])

  const value = useMemo(
    () => ({
      trainer,
      setCurrentTrainer,
    }),
    [trainer, setCurrentTrainer]
  )

  return (
    <TrainerContext.Provider value={value}>{children}</TrainerContext.Provider>
  )
}
