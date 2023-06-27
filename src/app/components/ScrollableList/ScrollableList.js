import PropTypes from 'prop-types'
import styles from './scrollableList.module.css'

export default function ScrollableList({
  trainer_name,
  children,
  direction = 'horizontal',
}) {
  return (
    <div data-direction={direction} className={styles.scrollable_list}>
      {children}
    </div>
  )
}

ScrollableList.propTypes = {
  trainer_name: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  direction: PropTypes.string,
}
