import { Link } from 'react-router-dom';

import formatDate from '../helpers';
import FlagemojiToSVG from './FlagmojiToSvg.jsx';
import styles from './CityItem.module.css';

function CityItem({ city }) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{<FlagemojiToSVG emoji={emoji} />}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{`(${formatDate(date)})`}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
