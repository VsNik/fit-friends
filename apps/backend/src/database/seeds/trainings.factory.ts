import { setSeederFactory } from 'typeorm-extension';
import { Training } from '../../app/trainings/models/training.model';
import { Faker } from '@faker-js/faker';
import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/libs/types';

export const TrainingsFactory = setSeederFactory(Training, (faker: Faker) => {
  const training = new Training();
  training.id = faker.string.uuid();
  training.title = faker.string.alpha({ length: { min: 1, max: 15 } });
  training.bgImage = faker.image.urlLoremFlickr({ width: 240, height: 320, category: 'nature' });
  training.level = faker.helpers.enumValue(TrainingLevel);
  training.type = faker.helpers.enumValue(TrainingType);
  training.duration = faker.helpers.enumValue(TrainingDuration);
  training.price = faker.number.int({ min: 0, max: 50000 });
  training.calories = faker.number.int({ min: 1000, max: 5000 });
  training.description = faker.lorem.sentence(15);
  training.gender = faker.helpers.enumValue(Gender);
  training.video = 'training-video.mp4';
  // training.rating = faker.number.int({ min: 1, max: 5 });
  training.rating = 0;
  training.isSpecial = !!faker.helpers.arrayElement([0, 1]);
  training.createdAt = faker.date.between({ from: '2012-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' }).toISOString();

  return training;
});
