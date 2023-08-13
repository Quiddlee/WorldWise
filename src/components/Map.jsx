import { useNavigate } from 'react-router-dom';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { useCities } from '../contexts/CitiesProvider.jsx';
import FlagemojiToSVG from './FlagmojiToSvg.jsx';
import useGeolocation from '../hooks/useGeolocation';
import Button from './Button.jsx';
import useUrlPosition from '../hooks/useUrlPosition';

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    getUserGeo,
    isLoading: isLoadingPosition,
    position: geolocationPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat || 40, mapLng || 0]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lng, geolocationPosition.lat]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {geolocationPosition &&
        !(
          <Button type="position" onClick={getUserGeo}>
            {isLoadingPosition ? 'loading...' : 'Use your position'}
          </Button>
        )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{<FlagemojiToSVG emoji={city.emoji} />}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
