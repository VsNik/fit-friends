import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';

config({ path: join(process.cwd(), '/apps/backend/.env') });

const typeOrmCli: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [join(process.cwd(), '**', 'models', '*.model.{js,ts}')],
  migrations: [join(process.cwd(), '**', 'migration', '*.ts')],
  migrationsTableName: 'migrations',
};

export const appDataSource = new DataSource(typeOrmCli);
