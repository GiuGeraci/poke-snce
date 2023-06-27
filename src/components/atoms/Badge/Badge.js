import PropTypes from 'prop-types'
import styles from './Badge.module.css'

export default function ExpBadge({ label }) {
  return <div className={styles.exp_badge}>{label}</div>
}

ExpBadge.propTypes = {
  label: PropTypes.string.isRequired,
}
