import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Review } from '../../app/reviews/models/review.model';

export const ReviewsFactory = setSeederFactory(Review, (faker: Faker) => {
  const review = new Review();

  review.id = faker.string.uuid();
  review.rating = faker.number.int({ min: 1, max: 5 });
  review.text = faker.lorem.sentence({ min: 3, max: 5 });
  review.createdAt = faker.date.between({ from: '2012-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' }).toISOString();

  return review;
});
