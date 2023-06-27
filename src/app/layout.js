import 'styles/globals.css'
import localFont from 'next/font/local'
import { TrainerProvider } from './context/TrainerContext'
import Header from './components/molecules/Header/header'

const pokeFont = localFont({
  src: './fonts/pokemon.ttf',
  display: 'swap',
  variable: '--pokemon-font',
  weight: '400',
})

export const metadata = {
  title: 'Pokemon App',
  description: `Pokemon App for s'nce application`,
}

async function getLoggedTrainer() {
  try {
    const req = await fetch(`http://localhost:3000/api/trainers`, {
      method: 'GET',
    })
    return await req.json()
  } catch (error) {
    return { id: '', name: '' }
  }
}

export default async function RootLayout({ children }) {
  const { trainer } = await getLoggedTrainer()
  return (
    <html lang="en">
      <body className={pokeFont.className}>
        <TrainerProvider value={trainer}>
          <Header trainer_name={trainer.username}></Header>
          {children}
        </TrainerProvider>
      </body>
    </html>
  )
}
