CREATE TABLE IF NOT EXISTS products
(
  id serial PRIMARY KEY,
  name TEXT DEFAULT '',
  barcode TEXT UNIQUE NOT NULL
)