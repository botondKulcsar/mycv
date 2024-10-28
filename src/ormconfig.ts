import { DataSourceOptions, DataSource } from 'typeorm';

const dbConfig = {
  type: 'sqlite',
  database: process.env.NODE_ENV == 'development' ? 'db.sqlite' : 'test.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['migrations/*.js'],
  migrationsRun: process.env.NODE_ENV == 'development' ? false : true,
} as DataSourceOptions;

export const AppDataSource = new DataSource(dbConfig);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initiliazed');
    console.log(dbConfig);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err.message);
  });
