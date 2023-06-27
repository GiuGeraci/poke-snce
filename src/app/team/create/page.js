'use client'
import Form from 'components/molecules/Form/Form'
import { fetchApi } from 'helpers/fetchApi'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { TrainerContext } from 'src/context/TrainerContext'
import styles from './page.module.css'

export default function TeamCreate() {
  const { trainer } = useContext(TrainerContext)
  const [name, setName] = useState('')
  const router = useRouter()

  const onInput = (event) => setName(event.target.value)
  async function createTeam(event) {
    event.preventDefault()
    if (name && name != '') {
      const { data, statusCode } = await fetchApi({
        path: 'teams',
        method: 'POST',
        body: {
          name,
          trainer_id: trainer.id,
        },
      })
      if (statusCode === 200 && data?.createdTeam) {
        router.push(`/team/${data?.createdTeam.id}/edit`)
      }
    }
  }
  return (
    <div className={styles.form_box}>
      <Form
        label={'Create a team'}
        onSubmit={createTeam}
        onInput={onInput}
      ></Form>
    </div>
  )
}
