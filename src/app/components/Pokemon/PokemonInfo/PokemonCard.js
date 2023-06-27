import PropTypes from 'prop-types'
import Image from 'next/image'
import styles from './pokemon.module.css'
export default function Pokemon({
  name,
  img_url,
  base_experience,
  pokemonAbilities = [],
  pokemonTypes = [],
}) {
  return (
    <div className={styles.card}>
      <div className={styles.exp_badge}>{base_experience}</div>
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

Pokemon.PropTypes = {
  name: PropTypes.string.isRequired,
  img_url: PropTypes.string.isRequired,
  base_experience: PropTypes.string.isRequired,
  abilities: PropTypes.arrayOf(PropTypes.string),
  types: PropTypes.arrayOf(PropTypes.string),
}
