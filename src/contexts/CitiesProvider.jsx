import { createContext, useContext, useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:8000/';
const API_CITIES_ENDPOINT = `${API_BASE_URL}cities`;

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(API_CITIES_ENDPOINT);
        const data = await res.json();
        setCities(data);
      } catch (e) {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchCities();
  }, [setIsLoading, setCities]);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_CITIES_ENDPOINT}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (e) {
      alert('There was an error loading data...');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

/**
 * @return {{
 *         cities: [{
 *             cityName: string,
 *             country: string,
 *             emoji: string,
 *             dat: string,
 *             notes: string,
 *             position: {
 *                 lat: number,
 *                 lng: number
 *             }
 *             id: number
 *         }],
 *         isLoading,
 *         currentCity,
 *         getCity,
 *       }}
 */
function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('CitiesContext is used outside the CitiesProvider!');

  return context;
}

export { CitiesProvider, useCities };
