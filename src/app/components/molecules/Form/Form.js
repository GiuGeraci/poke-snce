import PropTypes from 'prop-types'
import styles from './Form.module.css'
import Button from 'app/components/atoms/Button/Button'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TrainerContext } from 'src/context/TrainerContext'

export default function Form({ label }) {
  const { trainer } = useContext(TrainerContext)
  const [name, setName] = useState('')
  const router = useRouter()

  async function createTeam(event) {
    event.preventDefault()
    if (name && name != '') {
      const res = await fetch(`http://localhost:3000/api/teams`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          trainer_id: trainer?.id,
        }),
      })
      try {
        const { createdTeam } = await res.json()
        router.push(`/teams/${createdTeam.id}/edit`)
      } catch (error) {
        console.log(error)
      }
    }
    console.log(name)
  }
  return (
    <form onSubmit={createTeam}>
      <div>
        <h1>{label}</h1>
      </div>
      <input
        name="name"
        onInput={(event) => setName(event.target.value)}
        placeholder="Team name"
      />
      <input hidden defaultValue={1} name="trainer_id" />
      <Button label={label} type="submit"></Button>
    </form>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  onSubmit: PropTypes.func,
  trainer_id: PropTypes.number,
}
