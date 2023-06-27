import PropTypes from 'prop-types'
import styles from './Button.module.css'
import { TrainerContext } from '../../../context/TrainerContext'
import { useContext } from 'react'

export default function Button({ label, onClick, disabled }) {
  return (
    <button
      className={`${styles.button} p-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
