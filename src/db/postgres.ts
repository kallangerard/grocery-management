// https://github.com/vitaly-t/pg-promise-demo/blob/master/TypeScript/db/index.ts

import pgPromise from 'pg-promise';
// import promise from 'bluebird';
import config from 'config';

import { IInitOptions, IDatabase, IMain } from 'pg-promise';
import { IExtensions, ProductsRepository } from './repos';
import { Diagnostics } from './diagnostics';

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

const databaseConnectionString = config.get('database.connectionString');

const initOptions: IInitOptions = {
  extend(obj: ExtendedProtocol, dc: any) {
    obj.products = new ProductsRepository(obj, pgp);
  },
};

const pgp: IMain = pgPromise(initOptions);
const db: ExtendedProtocol = pgp(databaseConnectionString);

Diagnostics.init(initOptions);

export { pgp };
export { db };
