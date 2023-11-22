import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@fit-friends/shared';
import { getUserLocation } from '../../../utils/helpers';
import { PopupHeader } from '../popup-header/popup-header';

// Пионерская - 60.0030867, 30.2968189
// Удельная - 60.0192685, 30.3138117
// Звездная - 59.8331827, 30.3483969
// Спортивная - 59.9513246, 30.2936691

interface MapPopupProps {
  onClose: () => void;
  location: Location;
  title: string;
}

export const MapPopup: React.FC<MapPopupProps> = (props) => {
  const { onClose, location, title } = props;
  const position = location && getUserLocation(location);

  return (
    <section className="popup">
      <div className="modal__overlay" onClick={onClose} />
      <div className="popup__wrapper popup__wrapper--map">
        <PopupHeader onClose={onClose} title={title} address={position.title} className="popup-head--address" />
        
        <div className="popup__content-map">
          <div className="popup__map">
            <MapContainer center={[position.lat, position.lon]} zoom={16} style={{ height: '621px', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[position.lat, position?.lon]}>
                <Popup>Ст. Mетро {position.title}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
