/**
 * Formats the details of a Pokemon object, excluding the "pokemon_ability" and "pokemon_type" relationships,
 * and returns a new object with the Pokemon's abilities and types in a more readable way.
 *
 * @param {Object} pokemon - The Pokemon object to format.
 * @returns {Object} - The formatted Pokemon object with abilities and types.
 */
export function pokemonFormatter({ pokemon }) {
  const { pokemon_ability, pokemon_type, ...pokemonDetails } = pokemon
  const pokemonAbilities = pokemon_ability.map(({ ability }) => ({
    id: ability.id,
    name: ability.name,
  }))
  const pokemonTypes = pokemon_type.map(({ type }) => ({
    id: type.id,
    name: type.name,
  }))
  return { ...pokemonDetails, pokemonAbilities, pokemonTypes }
}

/**
 * Formats the raw Pokemon data received from the PokeAPI into a standardized Pokemon object.
 *
 * @param {Object} data - The raw Pokemon data from the PokeAPI.
 * @returns {Object} - The formatted Pokemon object.
 */
export function pokemonFormatterFromPokeApi({ data }) {
  const {
    abilities,
    types,
    base_experience,
    sprites: { front_default: img_url },
    name,
  } = data
  const pokemon = {
    abilities,
    types,
    base_experience,
    img_url,
    name,
  }
  return pokemon
}

export function formatTeams({ rawTeams }) {
  const teams = rawTeams.map(({ pokemon, ...team }) => ({
    ...team,
    total_experience: pokemon.reduce(
      (sum, pokemon) => sum + pokemon.base_experience,
      0
    ),

    pokemon: pokemon.map((pkmn) => pokemonFormatter({ pokemon: pkmn })),
  }))
  return addAbilitiesAndTypesArrayToTeams({ teams })
}

/**
 * Adds abilities and types arrays to each team object.
 *
 * @param {Array} param.teams - The array of team objects.
 * @returns {Array} - An array of team objects with added abilities and types arrays.
 */
export function addAbilitiesAndTypesArrayToTeams({ teams }) {
  return teams.map(({ pokemon, ...team }) => ({
    ...team,
    pokemon,
    types: extractFieldValues({
      array: pokemon,
      child: 'pokemonTypes',
      field: 'name',
    }),
    abilities: extractFieldValues({
      array: pokemon,
      child: 'pokemonAbilities',
      field: 'name',
    }),
  }))
}

/**
 * Extracts the values of a specific field from an array of objects.
 *
 * @param {Array} param.array - The array of objects.
 * @param {string} param.child - The property name of the child array within each object.
 * @param {string} param.field - The property name of the field to extract from each child object.
 * @returns {Array} - An array containing the unique values of the specified field.
 */
export function extractFieldValues({ array, child, field }) {
  return [
    ...new Set(
      array.flatMap((object) => object[child].map((child) => child[field]))
    ),
  ]
}
