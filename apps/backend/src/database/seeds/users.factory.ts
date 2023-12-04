import { hashSync } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Gender, Role, TrainingLevel, TrainingType, Location, TrainingDuration, UploadType } from '@fit-friends/shared';
import { User } from '../../app/users/models/user.model';
import { getRandomBg } from '@fit-friends/libs/utils';

const PASSWORD = 'password';
const trainingTypes = [
  TrainingType.Beg,
  TrainingType.Aerobic,
  TrainingType.Boxing,
  TrainingType.Yoga,
  TrainingType.Pilates,
  TrainingType.Crossfit,
  TrainingType.Stretching,
];

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
  const role = faker.helpers.enumValue(Role);

  const user = new User();
  user.id = faker.string.uuid();
  user.name = faker.internet.userName();
  user.email = faker.internet.email();
  user.avatar = faker.internet.avatar();
  user.password = hashSync(PASSWORD, 5);
  user.gender = faker.helpers.enumValue(Gender);
  user.birthDay = faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString();
  user.role = role;
  user.bio = faker.lorem.sentence(7);
  user.location = faker.helpers.enumValue(Location);
  user.bgImage = faker.helpers.multiple(() => getRandomBg(UploadType.BgUser), {count: 2});
  user.trainingLevel = faker.helpers.enumValue(TrainingLevel);
  user.trainingType = faker.helpers.arrayElements(trainingTypes, { min: 1, max: 3 });
  user.createdAt = faker.date.between({ from: '2012-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' }).toISOString();

  if (role === Role.User) {
    user.trainingDuration = faker.helpers.enumValue(TrainingDuration);
    user.loseCalories = faker.number.int({ min: 1000, max: 5000 });
    user.burnCalories = faker.number.int({ min: 1000, max: 5000 });
    user.ready = !!faker.helpers.arrayElement([0, 1]);
  } else {
    user.certificate = faker.helpers.multiple(() => getRandomBg(UploadType.Certificate), {count: 2});
    user.merits = faker.lorem.sentence(15);
    user.personalTraining = !!faker.helpers.arrayElement([0, 1]);
  }

  return user;
});
