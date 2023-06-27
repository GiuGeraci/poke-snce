import PropTypes from 'prop-types'
import styles from './Logo.module.css'
import Image from 'next/image'

export default function Logo({ onClick }) {
  return (
    <div className={styles.logo} onClick={onClick}>
      <Image
        src="/Pokemon-Logo-Background-PNG.png"
        alt="Pokemon Logo"
        width={200}
        height={200}
      />
    </div>
  )
}

Logo.propTypes = {
  onClick: PropTypes.func,
}
