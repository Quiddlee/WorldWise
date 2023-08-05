import styles from './CountryItem.module.css';
import FlagemojiToSVG from './FlagmojiToSvg.jsx';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{<FlagemojiToSVG emoji={country.emoji} />}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
