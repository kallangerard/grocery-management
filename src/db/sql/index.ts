import { QueryFile, IQueryFileOptions } from 'pg-promise';
import { join as joinPath } from 'path';

const sql = (file: string): QueryFile => {
  const fullPath: string = joinPath(__dirname, file);
  const options: IQueryFileOptions = { minify: true };

  const queryFile: QueryFile = new QueryFile(fullPath, options);

  if (queryFile.error) {
    console.error(queryFile.error);
  }
  return queryFile;
};

export const products = {
  create: sql('products/create.sql'),
  empty: sql('products/empty.sql'),
  drop: sql('products/drop.sql'),
  find: sql('products/find.sql'),
  add: sql('products/add.sql'),
};
