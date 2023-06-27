import PropTypes from 'prop-types'
import styles from './header.module.css'
import Logo from 'app/components/atoms/Logo/logo'

export default function Header({ trainer_name }) {
  return (
    <header className={styles.header}>
      <div className={styles.trainer_name}>Benvenuto {trainer_name}</div>
      <Logo></Logo>
    </header>
  )
}

Header.propTypes = {
  trainer_name: PropTypes.string,
}
