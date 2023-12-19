import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import { config } from 'dotenv';
import { join } from 'path';
import { OrdersFactory } from './orders.factory';
import { Order } from '../../app/orders/models/order.model';
import { User } from '../../app/users/models/user.model';
import { Training } from '../../app/trainings/models/training.model';
import { Review } from '../../app/reviews/models/review.model';
import { UsersFactory } from './users.factory';
import { TrainingsFactory } from './trainings.factory';
import { ReviewsFactory } from './reviews.factory';
import DbSeeder from './db.seeder';

config({ path: join(process.cwd(), '/apps/backend/.env') });

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Training, Review, Order],
  factories: [UsersFactory, TrainingsFactory, ReviewsFactory, OrdersFactory],
  seeds: [DbSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await runSeeders(dataSource);
  console.log('Done.');
  process.exit();
});
