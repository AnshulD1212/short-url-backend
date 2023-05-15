import { DataSource } from 'typeorm';
import { ShortUrl } from './entities/shortUrl.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url:
    process.env.DATABASE_URL || 'postgres://postgres:@localhost:5432/short_url',
  entities: [ShortUrl],
  subscribers: [],
  migrations: ['./src/migrations/*.ts'],
  migrationsTableName: 'migrations'
});
