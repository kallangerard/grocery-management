import pgPromise from 'pg-promise';
import { databaseConnectionString } from '../config';

const pgp = pgPromise({});
const db = pgp(databaseConnectionString);

const createTableProducts = `
  DROP TABLE IF EXISTS products;
  CREATE TABLE IF NOT EXISTS products (
    id serial primary key not null,
    name text DEFAULT '',
    barcode text UNIQUE NOT NULL
  );
`;

const createTableEvents = `
  DROP TABLE IF EXISTS events;
  CREATE TABLE IF NOT EXISTS events (
    id serial primary key not null,
    uuid uuid NOT NULL,
    event text NOT NULL,
    action jsonb NOT NULL,
    inserted_at timestamptz NOT NULL DEFAULT now()
  );
`;

const sqlQuery = async (query: string) => {
  try {
    const response = await db.none(query);
  } catch (error) {
    console.log(error);
  }
};

sqlQuery(createTableProducts);
sqlQuery(createTableEvents);
export default db;
