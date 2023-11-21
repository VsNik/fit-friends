import { Location } from '@fit-friends/shared';

export const getUserLocation = (name: Location) => {
  const latLon = {
    pionerskaya: { title: 'Пионерская', lat: 60.0030867, lon: 30.2968189 },
    udelnaya: { title: 'Удельная', lat: 60.0192685, lon: 30.3138117 },
    zvezdnaya: { title: 'Звездная', lat: 59.8331827, lon: 30.3483969 },
    sportivnaya: { title: 'Спортивная', lat: 59.9513246, lon: 30.2936691 },
  };
  return latLon[name];
};
