import { DataSourceOptions, DataSource } from 'typeorm';

const dbConfig = {
  type: 'sqlite',

  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['migrations/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    dbConfig['database'] = 'db.sqlite';
    dbConfig['migrationsRun'] = false;
    break;
  case 'test':
    dbConfig['database'] = 'test.db';
    dbConfig['migrationsRun'] = true;
    break;
  case 'production':
    dbConfig.type = 'postgres';
    dbConfig['url'] = process.env.DATABASE_URL;
    dbConfig['migrationsRun'] = true;
    dbConfig['ssl'] = {
      rejectUnauthorized: false,
    };
    break;
  default:
    break;
}

export const AppDataSource = new DataSource(dbConfig as DataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initiliazed');
    console.log(dbConfig);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err.message);
  });
