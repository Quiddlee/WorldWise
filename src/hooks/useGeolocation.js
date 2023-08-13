import { useState } from 'react';

/**
 * @param defaultPosition {number | null}
 * @return {{isLoading: boolean, getUserGeo: ((function(): (void))|*), position: {}, error: unknown}}
 */
function useGeolocation(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function getUserGeo() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    setIsLoading(true);
    return navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      },
    );
  }

  return { getUserGeo, position, isLoading, error };
}

export default useGeolocation;
