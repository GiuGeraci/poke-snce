'use client'

import TeamCard from 'components/Pokemon/TeamCard/TeamCard'
import Button from 'components/atoms/Button/Button'
import { fetchApi } from 'helpers/fetchApi'
import { useContext, useEffect, useState } from 'react'
import { TrainerContext } from 'src/context/TrainerContext'
import { buildSearchParams } from 'utils/url.util'
import { useRouter } from 'next/navigation'

export default function TeamList() {
  const [selectedAbilities, setSelectedAbilities] = useState([])
  const [abilities, setAbilities] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [types, setTypes] = useState([])
  const [teams, setTeams] = useState([])
  const { trainer } = useContext(TrainerContext)
  const router = useRouter()

  const openEditTeam = async (id) => {
    router.push(`/team/${id}/edit`)
  }

  const retrieveData = async (path, setData, dataKey) => {
    const { data, statusCode } = await fetchApi({
      path,
    })

    if (statusCode === 200) {
      setData(data[dataKey])
    }
  }

  const updateFilter = (value, setSelectedValue) => {
    setSelectedValue((prevValue) =>
      prevValue.includes(value)
        ? prevValue.filter((item) => item !== value)
        : [...prevValue, value]
    )
  }

  const retrieveTeams = async () => {
    const params = buildSearchParams(
      selectedAbilities,
      selectedTypes,
      trainer?.id
    )
    const path = `teams?${params}`

    await retrieveData(path, setTeams, 'teams')
  }

  const retrieveAbilities = async () => {
    const path = `abilities`

    await retrieveData(path, setAbilities, 'abilities')
  }

  const retrieveTypes = async () => {
    const path = `types`

    await retrieveData(path, setTypes, 'types')
  }

  useEffect(() => {
    retrieveAbilities()
    retrieveTypes()
    retrieveTeams()
  }, [])

  return (
    <div>
      <div>
        <select
          multiple
          onChange={(e) => updateFilter(e.target.value, setSelectedAbilities)}
        >
          {abilities.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
        <select
          multiple
          onChange={(e) => updateFilter(e.target.value, setSelectedTypes)}
        >
          {types.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
        <Button onClick={retrieveTeams}></Button>
      </div>
      <div>
        {teams.map(({ id, ...team }) => (
          <TeamCard
            key={id}
            name={team.name}
            total_experience={team.total_experience}
            pokemon={team.pokemon}
            abilities={team.abilities}
            types={team.types}
            onClick={() => openEditTeam(id)}
          ></TeamCard>
        ))}
      </div>
    </div>
  )
}
