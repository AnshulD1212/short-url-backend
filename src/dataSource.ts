import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  database: process.env.DATABASE_NAME || 'short_url',
  entities: ['./src/entities/*.entity.ts'],
  subscribers: [],
  migrations: ['./src/migrations/*.ts'],
  migrationsTableName: 'migrations'
});
