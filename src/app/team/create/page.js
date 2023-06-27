'use client'
import Button from 'app/components/atoms/Button/Button'
import ScrollableList from 'app/components/ScrollableList/ScrollableList'
import Pokemon from 'app/components/Pokemon/PokemonInfo/PokemonCard'
import { useState } from 'react'
import Form from 'app/components/molecules/Form/Form'
import { useTrainer } from 'src/context/TrainerContext'

export default function TeamCreate() {
  return (
    <div>
      <Form label={'crea team'}></Form>
    </div>
  )
}
