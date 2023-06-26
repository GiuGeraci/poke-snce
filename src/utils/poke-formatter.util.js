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
