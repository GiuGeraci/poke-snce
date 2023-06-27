'use client'
import Button from 'components/atoms/Button/Button'
import ScrollableList from 'components/ScrollableList/ScrollableList'
import Pokemon from 'components/Pokemon/PokemonInfo/PokemonCard'
import { useEffect, useState } from 'react'
import { fetchApi } from 'helpers/fetchApi'
import Form from 'components/molecules/Form/Form'
import { useRouter } from 'next/navigation'

export default function TeamCreate({ params }) {
  const [pokemonList, setPokemonList] = useState([])
  const [team, setTeam] = useState([])
  const router = useRouter()
  async function addPokemon() {
    const { data, statusCode } = await fetchApi({
      path: `teams/${params.id}/pokemon`,
      method: 'POST',
    })

    if (statusCode === 200)
      setPokemonList((oldValue) => [...oldValue, data?.pokemon])
  }

  const onInput = (event) => setName(event.target.value)

  async function editTeam(event) {
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

  console.log(team)

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
            {pokemonList.map((pokemon, index) => (
              <Pokemon key={index} {...pokemon}></Pokemon>
            ))}
          </ScrollableList>
        </div>
      </div>
    </div>
  )
}
