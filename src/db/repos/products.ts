import { request } from 'express';
import { IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { Product } from '../models';
import { products as sql } from '../sql';

class ProductsRepository {
  // private db: IDatabase<any>;
  // private pgp: IMain;

  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  async create(): Promise<null> {
    return this.db.none(sql.create);
  }

  async drop(): Promise<null> {
    return this.db.none(sql.drop);
  }

  async empty(): Promise<null> {
    return this.db.none(sql.empty);
  }

  async add(values: { name?: string; barcode: string }): Promise<Product> {
    return this.db.one(sql.add, {
      productName: values.name,
      productBarcode: values.barcode,
    });
  }

  // +variable converts variable into number
  async remove(id: number): Promise<number> {
    return this.db.result(
      'DELETE FROM products where id = $1:name',
      +id,
      (result: IResult) => result.rowCount,
    );
  }

  async find(values: { id: number }): Promise<Product | null> {
    return this.db.oneOrNone(sql.find, { productId: +values.id });
  }

  async all(): Promise<Product[]> {
    return this.db.any('SELECT * FROM products');
  }

  async total(): Promise<number> {
    return this.db.one(
      'SELECT count(*) FROM products',
      [],
      (data: { count: string }) => +data.count,
    );
  }
}

export { ProductsRepository };
