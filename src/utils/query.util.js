/**
 *
 *  Object defining inclusion of abilities and types in the Pokemon object.
 */
export const includeAbilitiesAndTypesInPokemon = {
  pokemon_ability: {
    include: { ability: { select: { id: true, name: true } } },
  },
  pokemon_type: {
    include: { type: { select: { id: true, name: true } } },
  },
}

/**
 *
 *  Appends filters to the search teams query object.
 *  @param {Array<number>} filters.abilities - The abilities IDs.
 *  @param {Array<number>} filters.types - The types IDs.
 *  @returns {Object} - The modified query object with filters.
 */
export function appendFiltersToSearchTeamQuery({ abilities, types }) {
  const some = {}
  if (abilities !== null) {
    some.pokemon_ability = {
      some: {
        ability_id: {
          in: abilities,
        },
      },
    }
  }

  if (types !== null) {
    some.pokemon_type = {
      some: {
        type_id: {
          in: types,
        },
      },
    }
  }
  return some
}
