import { Link } from 'react-router-dom';

import formatDate from '../helpers';
import FlagemojiToSVG from './FlagmojiToSvg.jsx';
import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiesProvider.jsx';

function CityItem({ city }) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  const { currentCity, deleteCity } = useCities();

  function handleDeleteCity(e) {
    e.preventDefault();
    void deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{<FlagemojiToSVG emoji={emoji} />}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{`(${formatDate(date)})`}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
