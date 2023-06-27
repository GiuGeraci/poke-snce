import PropTypes from 'prop-types'
import styles from './Button.module.css'

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
