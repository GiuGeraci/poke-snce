'use client'

import PropTypes from 'prop-types'
import styles from './header.module.css'
import Logo from 'app/components/atoms/Logo/Logo'
import { TrainerContext } from 'src/context/TrainerContext'
import { useContext } from 'react'

export default function Header() {
  const { trainer } = useContext(TrainerContext)
  
  return (
    <header className={styles.header}>
      <div className={styles.trainer_name}>Benvenuto {trainer?.username}</div>
      <Logo></Logo>
    </header>
  )
}

Header.propTypes = {
  trainer_name: PropTypes.object,
}
