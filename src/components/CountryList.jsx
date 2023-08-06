import styles from './CountryList.module.css';
import Spinner from './Spinner.jsx';
import Message from './Message.jsx';
import CountryItem from './CountryItem.jsx';

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }

    return arr;
  }, []);

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
