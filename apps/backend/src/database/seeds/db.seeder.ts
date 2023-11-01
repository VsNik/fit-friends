import { DataSource } from 'typeorm';
import { Seeder, SeederFactory, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Role } from '@fit-friends/libs/types';
import { Training } from '../../app/trainings/models/training.model';
import { Review } from '../../app/reviews/models/review.model';
import { Order } from '../../app/orders/models/order.model';
import { User } from '../../app/users/models/user.model';

enum FakeCount {
  Users = 8,
  Trainings = 10,
  Reviews = 20,
  Orders = 10,
}

export default class DbSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const trainingsRepository = dataSource.getRepository(Training);
    const reviewsRepository = dataSource.getRepository(Review);
    const ordersRepository = dataSource.getRepository(Order);

    await dataSource.query('TRUNCATE TABLE "reviews", "trainings", "users", "orders" CASCADE');

    const usersFactory = factoryManager.get(User);
    const trainingsFactory = factoryManager.get(Training);
    const reviewsFactory = factoryManager.get(Review);
    const ordersFactory = factoryManager.get(Order);

    const users = await usersFactory.saveMany(FakeCount.Users);
    const usersWithUserRole = users.filter((item) => item.role === Role.User);
    const usersWithRoleCoach = users.filter((item) => item.role === Role.Coach);

    if (usersWithRoleCoach.length > 0) {
      const trainings = await this.seedTrainings(trainingsFactory, usersWithRoleCoach);
      await trainingsRepository.save(trainings);

      if (usersWithUserRole.length > 0) {
        const reviews = await this.seedReviews(reviewsFactory, usersWithUserRole, trainings);
        await reviewsRepository.save(reviews);

        const orders = await this.seedOrders(ordersFactory, usersWithUserRole, trainings);
        await ordersRepository.save(orders);

        await Promise.all(
          orders.map(async (order) => {
            const training = order.training;
            training.ordersCount += order.count;
            training.ordersSumm += order.totalPrice;
            const {id, ...toUpdate} = training;
            await trainingsRepository.update({id}, toUpdate);
          }),
        );
      }
    }
  }

  async seedTrainings(trainingsFactory: SeederFactory<Training>, users: User[]) {
    return Promise.all(
      Array(FakeCount.Trainings)
        .fill('')
        .map(async () => {
          return trainingsFactory.make({
            coach: faker.helpers.arrayElement(users),
          });
        }),
    );
  }

  async seedReviews(reviewsFactory: SeederFactory<Review>, users: User[], trainings: Training[]) {
    return Promise.all(
      Array(FakeCount.Reviews)
        .fill('')
        .map(async () => {
          return reviewsFactory.make({
            user: faker.helpers.arrayElement(users),
            training: faker.helpers.arrayElement(trainings),
          });
        }),
    );
  }

  async seedOrders(ordersFactory: SeederFactory<Order>, users: User[], trainings: Training[]) {
    return Promise.all(
      Array(FakeCount.Orders)
        .fill('')
        .map(async () => {
          return ordersFactory.make({
            user: faker.helpers.arrayElement(users),
            training: faker.helpers.arrayElement(trainings),
          });
        }),
    );
  }
}
