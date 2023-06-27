'use client'

import Button from './components/atoms/Button/button'
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()

  function goToCreateTeam() {
    router.push('/teams/create')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col item-center justify-between w-1/2 h-full">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl">Acchiappali tutti</h1>
          <h2 className="text-xl">Qui comincia la tua avventura</h2>
        </div>
        <div className="flex flex-row justify-between w-full mt-20">
          <Button label="Create team" onClick={goToCreateTeam}></Button>
          <Button></Button>
        </div>
      </div>
    </main>
  )
}
