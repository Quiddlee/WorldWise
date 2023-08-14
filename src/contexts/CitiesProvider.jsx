import { createContext, useContext, useEffect, useReducer } from 'react';

const API_BASE_URL = 'http://localhost:8000/';
const API_CITIES_ENDPOINT = `${API_BASE_URL}cities`;

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

/**
 * @param state {{
 *     cities: [{
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
 *     isLoading: boolean,
 *     currentCity: {
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
 *         }
 *     error: string
 * }}
 * @param action {{type: string, payload: any}}
 */
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error('Unknown action type!');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });

      try {
        const res = await fetch(API_CITIES_ENDPOINT);
        const data = await res.json();

        dispatch({ type: 'cities/loaded', payload: data });
      } catch (e) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...',
        });
      }
    }

    void fetchCities();
  }, [dispatch]);

  /**
   * @param id {number}
   * @return {Promise<void>}
   */
  async function getCity(id) {
    if (Number(currentCity.id) === Number(id)) return;

    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${API_CITIES_ENDPOINT}/${id}`);
      const data = await res.json();

      dispatch({ type: 'city/loaded', payload: data });
    } catch (e) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city...',
      });
    }
  }

  /**
   * @param newCity {{
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
   *         }}
   * @return {Promise<void>}
   */
  async function createCity(newCity) {
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${API_CITIES_ENDPOINT}`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      dispatch({ type: 'city/created', payload: data });
    } catch (e) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city...',
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });

    try {
      await fetch(`${API_CITIES_ENDPOINT}/${id}`, { method: 'DELETE' });

      dispatch({ type: 'city/deleted', payload: id });
    } catch (e) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
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
 *         isLoading: boolean,
 *         currentCity: {
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
 *         },
 *         getCity: (id: number) => Promise<void>,
 *         createCity: (city: {
 *             cityName: string,
 *             country: string,
 *             emoji: string,
 *             date: Date,
 *             notes: string,
 *             position: {
 *                 lat: string,
 *                 lng: string
 *             }
 *         }) => Promise<void>
 *         deleteCity: (id: number) => Promise<void>
 *       }}
 */
function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('CitiesContext is used outside the CitiesProvider!');

  return context;
}

export { CitiesProvider, useCities };
