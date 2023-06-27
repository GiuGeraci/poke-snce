import PropTypes from 'prop-types'
import styles from './Form.module.css'
import Button from 'components/atoms/Button/Button'

export default function Form({ label, onSubmit, onInput, placeholder = null }) {
  return (
    <form onSubmit={onSubmit}>
      <div classname={styles.title}>
        <h1>{label}</h1>
      </div>
      <div>
        <input
          name="name"
          onInput={onInput}
          placeholder={placeholder || 'Team Name'}
        />
        <Button label={label} type="submit"></Button>
      </div>
    </form>
  )
}

Form.propTypes = {
  label: PropTypes.string,
  onSubmit: PropTypes.func,
  trainer_id: PropTypes.number,
  placeholder: PropTypes.string,
}
