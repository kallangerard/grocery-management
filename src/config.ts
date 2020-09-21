import config from 'config';

const databaseConnectionString: string = config.get(
  'database.connectionString',
);

export { databaseConnectionString };
