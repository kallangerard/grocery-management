import pgPromise from 'pg-promise';
import { databaseConnectionString } from '../config';

const pgp = pgPromise({});
const db = pgp(databaseConnectionString);

const createTableProducts = `
  DROP TABLE IF EXISTS products;
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR DEFAULT '',
    barcode VARCHAR
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
export default db;
