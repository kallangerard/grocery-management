import { db, pgp } from '../db';

const runQuery = async (query: string) => {
  try {
    const response = await db.query(query);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createTableProducts = `
  DROP TABLE IF EXISTS products;
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT DEFAULT '',
    barcode TEXT UNIQUE NOT NULL
  );
`;
runQuery(createTableProducts);

const createTableVendors = `
  DROP TABLE IF EXISTS vendors;
  CREATE TABLE IF NOT EXISTS vendors (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
  );
`;
runQuery(createTableVendors);

const createTableEvents = `
DROP TABLE IF EXISTS events;
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  uuid UUID NOT NULL,
  event TEXT NOT NULL,
  action JSONB NOT NULL,
  inserted_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
  `;
runQuery(createTableEvents);

// https://www.semicolonworld.com/question/44622/multi-row-insert-with-pg-promise
const productsColumnSet = new pgp.helpers.ColumnSet(['name', 'barcode'], {
  table: 'products',
});

const insertProducts = async (values: object[]) => {
  const query = pgp.helpers.insert(values, productsColumnSet);

  try {
    await db.none(query);
  } catch (error) {
    console.log(error);
  }
};

insertProducts([
  { name: 'VitaSoy Regular Soy Milk 1L', barcode: '123456' },
  { name: 'Plain Flour 1KG', barcode: '234567' },
  { name: 'Chicken Stock', barcode: '345678' },
]);
