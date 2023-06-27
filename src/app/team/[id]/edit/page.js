'use client'
import Button from 'app/components/atoms/Button/Button'
import ScrollableList from 'app/components/ScrollableList/ScrollableList'
import Pokemon from 'app/components/Pokemon/PokemonInfo/PokemonCard'
import { useEffect, useState } from 'react'
import { fetchApi } from 'helpers/fetchApi'

export default function TeamCreate({ params }) {
  const [pokemonList, setPokemonList] = useState([])
  
  async function create() {
    const { data, statusCode } = await fetchApi({ path : `teams/${params.id}/pokemon`, method: 'POST' })

    if (statusCode === 200) setPokemonList((oldValue) => [...oldValue, data?.pokemon])

  }

  useEffect(() => {
    const retrieveTeam = async () => {
        const { data, statusCode } = await fetchApi({ path : `teams/${params.id}` })

        if (statusCode === 200) {
            setPokemonList(data?.team?.pokemon)
        }
    }

    retrieveTeam()
  }, [params.id])

  return (
    <div>
      <div>Modifica team</div>
      <Button
        label="Create pokemon"
        onClick={create}
        disabled={pokemonList.length >= 6}
      ></Button>
      <div>
        <ScrollableList>
          {pokemonList.map((pokemon, index) => (
            <Pokemon key={index} {...pokemon}></Pokemon>
          ))}
        </ScrollableList>
      </div>
    </div>
  )
}
