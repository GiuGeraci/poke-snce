import PropTypes from 'prop-types'
import Image from 'next/image'
import styles from './TeamCard.module.css'
import Badge from 'components/atoms/Badge/Badge'
import Button from 'components/atoms/Button/Button'
export default function TeamCard({
  name,
  total_experience,
  pokemon,
  abilities = [],
  types = [],
  onClick,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.top_info}>
        <Badge label={total_experience}></Badge>
        <h1 className={styles.name}>{name}</h1>
      </div>
      <div className={styles.pokemon_info}>
        {pokemon.map(({ id, name, img_url }) => (
          <div key={id}>
            <Image
              className={styles.img_sprite}
              src={img_url}
              alt={name}
              width={100}
              height={100}
            />
            <h1 className={styles.pokemon_name}>{name}</h1>
          </div>
        ))}
      </div>
      <div>
        <div className={styles.type_list}>
          {abilities.map((type, index) => (
            <div key={index}>{type.name}</div>
          ))}
        </div>
        <div className={styles.abilities_list}>
          {types.map((type, index) => (
            <div key={index}>{type.name}</div>
          ))}
        </div>
      </div>
      <Button>Modifica Team</Button>
    </div>
  )
}

TeamCard.PropTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.function,
  total_experience: PropTypes.string.isRequired,
  pokemon: PropTypes.object,
  abilities: PropTypes.arrayOf(PropTypes.string),
  types: PropTypes.arrayOf(PropTypes.string),
}
