import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './app/users/models/user.model';
import { Token } from './app/tokens/models/token.model';
import { Training } from './app/trainings/models/training.model';
import { Review } from './app/reviews/models/review.model';
import { Order } from './app/orders/models/order.model';
import { join } from 'path';
import { config } from 'dotenv';
import { Balance } from './app/balance/models/balance.model';
import { Notify } from './app/notify/models/notify.model';
import { Alert } from './app/alerts/models/alert.model';
import { Invitation } from './app/invitations/models/invitation.model';

config({ path: join(process.cwd(), '/apps/backend/.env') });

const typeOrmCli: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Token, Training, Review, Order, Balance, Notify, Alert, Invitation],
  migrations: ['apps/backend/src/database/migration/*.ts'],
  migrationsTableName: 'migrations',
};

export const appDataSource = new DataSource(typeOrmCli);
