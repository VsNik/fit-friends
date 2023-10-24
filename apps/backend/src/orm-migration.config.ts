import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './app/users/models/user.model';
import { Token } from './app/tokens/models/token.model';
import { Training } from './app/trainings/models/training.model';
import { Review } from './app/reviews/models/review.model';
import { Order } from './app/orders/models/order.model';
import { join } from 'path';
import { config } from 'dotenv';

config({ path: join(process.cwd(), '/apps/backend/.env') });

const typeOrmCli: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Token, Training, Review, Order],
  migrations: ['apps/backend/src/database/migration/*.ts'],
  migrationsTableName: 'migrations',
};

export const appDataSource = new DataSource(typeOrmCli);
