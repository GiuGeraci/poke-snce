'use client'
import { useState } from 'react'
import Form from 'components/molecules/Form/Form'
import { useTrainer } from 'src/context/TrainerContext'

export default function TeamCreate() {
  return (
    <div>
      <Form label={'crea team'}></Form>
    </div>
  )
}
