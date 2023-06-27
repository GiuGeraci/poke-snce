'use client'

import PropTypes from 'prop-types'
import styles from './header.module.css'
import Logo from 'components/atoms/Logo/Logo'
import { TrainerContext } from 'src/context/TrainerContext'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { trainer } = useContext(TrainerContext)
  const router = useRouter()
  async function redirectToHome() {
    router.push(`/`)
  }
  return (
    <header className={styles.header}>
      <div className={styles.trainer_name}>
        Welcome on board {trainer?.username}
      </div>
      <Logo onClick={redirectToHome}></Logo>
    </header>
  )
}

Header.propTypes = {
  trainer_name: PropTypes.object,
}
