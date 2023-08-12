import { createContext, useContext, useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:8000/';
const API_CITIES_ENDPOINT = `${API_BASE_URL}cities`;

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(API_CITIES_ENDPOINT);
        const data = await res.json();
        setCities(data);
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchCities();
  }, [setIsLoading, setCities]);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('CitiesContext is used outside the CitiesProvider!');

  return context;
}

export { CitiesProvider, useCities };
