import PropTypes from 'prop-types'
import Image from 'next/image'
import styles from './PokemonCard.module.css'
import Badge from 'components/atoms/Badge/Badge'
export default function PokemonCard({
  name,
  img_url,
  base_experience,
  pokemonAbilities = [],
  pokemonTypes = [],
}) {
  return (
    <div className={styles.card}>
      <Badge label={base_experience}></Badge>
      <Image
        className={styles.img_sprite}
        src={img_url}
        alt={name}
        width={100}
        height={100}
      />
      <h1 className={styles.name}>{name}</h1>
      <div className={styles.type_box}>
        {pokemonTypes.map((type, index) => (
          <div key={index}>{type.name}</div>
        ))}
      </div>
      <div className={styles.abilities_box}>
        {pokemonAbilities.map((type, index) => (
          <div key={index}>{type.name}</div>
        ))}
      </div>
    </div>
  )
}

PokemonCard.PropTypes = {
  name: PropTypes.string.isRequired,
  img_url: PropTypes.string.isRequired,
  base_experience: PropTypes.string.isRequired,
  abilities: PropTypes.arrayOf(PropTypes.string),
  types: PropTypes.arrayOf(PropTypes.string),
}
