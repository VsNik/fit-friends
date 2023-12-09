import { Location, TrainingType, TrainingDuration, TrainingLevel, Gender } from '@fit-friends/shared';

export const isNotEmptyObject = (item: object): boolean => {
  return Object.keys(item).length !== 0;
}

export const toNumberInputTextValue = (value: string) => Number(value.replace(/\D/g, ''));

export const getUserLocation = (name: Location) => {
  const latLon = {
    [Location.Pionerskaya]: { title: 'Пионерская', lat: 60.0030867, lon: 30.2968189 },
    [Location.Udelnaya]: { title: 'Удельная', lat: 60.0192685, lon: 30.3138117 },
    [Location.Zvezdnaya]: { title: 'Звездная', lat: 59.8331827, lon: 30.3483969 },
    [Location.Sportivnaya]: { title: 'Спортивная', lat: 59.9513246, lon: 30.2936691 },
  };
  return latLon[name];
};

export const getTrainingName = (type: TrainingType) => {
  const traininName = {
    [TrainingType.Yoga]: 'Йога',
    [TrainingType.Beg]: 'Бег',
    [TrainingType.Boxing]: 'Бокс',
    [TrainingType.Power]: 'Силовые',
    [TrainingType.Stretching]: 'Стрейчинг',
    [TrainingType.Crossfit]: 'Кроссфит',
    [TrainingType.Aerobic]: 'Аэробика',
    [TrainingType.Pilates]: 'Пилатес',
  }
  return traininName[type];
}

export const getDurationName = (duration: TrainingDuration) => {
  const durationName = {
    [TrainingDuration.Low]: '10 мин - 30 мин',
    [TrainingDuration.Normal]: '30 мин - 50 мин',
    [TrainingDuration.Hi]: '50 мин - 80 мин',
    [TrainingDuration.Extra]: '80 мин - 100 мин',
  }
  return durationName[duration];
}

export const getLevelName = (level: TrainingLevel) => {
  const levelName = {
    [TrainingLevel.Novice]: 'Новичок',
    [TrainingLevel.Amateur]: 'Любитель',
    [TrainingLevel.Professional]: 'Профессионал',
  }
  return levelName[level];
}

export const getGenderName = (gender: Gender) => {
  const genderName = {
    [Gender.Male]: 'для_мужчин',
    [Gender.Female]: 'для_женщин',
    [Gender.AnyGender]: 'для_всех',
  }
  return genderName[gender];
}

export const getPriceView = (price: number): string => {
  return price === 0 ? 'Бесплатно' : `${price}`;
}