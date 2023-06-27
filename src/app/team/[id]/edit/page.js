'use client'
import Button from 'components/atoms/Button/Button'
import ScrollableList from 'components/ScrollableList/ScrollableList'
import { useEffect, useState } from 'react'
import { fetchApi } from 'helpers/fetchApi'
import Form from 'components/molecules/Form/Form'
import { useRouter } from 'next/navigation'
import PokemonCard from 'components/Pokemon/PokemonCard/PokemonCard'

export default function TeamCreate({ params }) {
  const [pokemonList, setPokemonList] = useState([])
  const [team, setTeam] = useState([])
  const router = useRouter()
  const addPokemon = async () => {
    const { data, statusCode } = await fetchApi({
      path: `teams/${params.id}/pokemon`,
      method: 'POST',
    })

    if (statusCode === 200)
      setPokemonList((oldValue) => [...oldValue, data?.pokemon])
  }

  const onInput = (event) => setName(event.target.value)

  const editTeam = async (event) => {
    event.preventDefault()
    if (name && name != '') {
      const { data, statusCode } = await fetchApi({
        path: 'teams',
        method: 'PATCH',
        body: {
          name,
        },
      })

      if (statusCode === 200) {
        setTeam(data?.team)
      }
    }
  }

  const deletePokemon = async (id) => {
    const { data, statusCode } = await fetchApi({
      path: `teams/${team.id}/pokemon/${id}`,
      method: 'DELETE',
    })

    if (statusCode === 200) {
      setPokemonList(
        pokemonList.filter(({ id: existantId }) => existantId !== id)
      )
    }
  }
  useEffect(() => {
    const retrieveTeam = async () => {
      const { data, statusCode } = await fetchApi({
        path: `teams/${params.id}`,
      })

      if (statusCode === 200) {
        setPokemonList(data?.team?.pokemon)
        setTeam(data?.team)
      } else {
        router.push(`/`)
      }
    }

    retrieveTeam()
  }, [params.id])

  return (
    <div>
      <div>
        <div>Edit Team</div>
        <Form
          label={'Edit'}
          onSubmit={editTeam}
          onInput={onInput}
          placeholder={team.name}
        ></Form>
      </div>
      <div>
        <div>Add Pokemon</div>
        <Button
          label="Get a random Pokemon"
          onClick={addPokemon}
          disabled={pokemonList.length >= 6}
        ></Button>
        <div>
          <ScrollableList>
            {pokemonList.map(({ id, ...pokemon }, index) => (
              <PokemonCard
                key={index}
                {...pokemon}
                onClick={() => deletePokemon(id)}
              ></PokemonCard>
            ))}
          </ScrollableList>
        </div>
      </div>
    </div>
  )
}
