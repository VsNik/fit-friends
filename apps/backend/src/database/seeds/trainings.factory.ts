import { setSeederFactory } from 'typeorm-extension';
import { Training } from '../../app/trainings/models/training.model';
import { Faker } from '@faker-js/faker';
import { Gender, TrainingDuration, TrainingLevel, TrainingType, UploadType } from '@fit-friends/shared';
import { getRandomBg } from '@fit-friends/libs/utils';

export const TrainingsFactory = setSeederFactory(Training, (faker: Faker) => {
  const training = new Training();
  training.id = faker.string.uuid();
  training.title = faker.string.alpha({ length: { min: 1, max: 15 } });
  training.bgImage = getRandomBg(UploadType.BgTraining);
  training.level = faker.helpers.enumValue(TrainingLevel);
  training.type = faker.helpers.enumValue(TrainingType);
  training.duration = faker.helpers.enumValue(TrainingDuration);
  training.price = faker.number.int({ min: 0, max: 10000 });
  training.calories = faker.number.int({ min: 1000, max: 5000 });
  training.description = faker.lorem.sentence(15);
  training.gender = faker.helpers.enumValue(Gender);
  training.video = getRandomBg(UploadType.Video);
  training.rating = faker.number.int({ min: 1, max: 5 });
  training.isSpecial = !!faker.helpers.arrayElement([0, 1]);
  training.createdAt = faker.date.between({ from: '2012-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' }).toISOString();

  return training;
});
