import './globals.css'
import localFont from 'next/font/local'

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pokeFont.className}>{children}</body>
    </html>
  )
}
