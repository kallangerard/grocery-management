import express, { IRouterMatcher, NextFunction, Request } from 'express';
import { db } from '../db';
import { GET, POST } from '../utils/routeHandlers';

const router = express.Router();

// Table Methods
POST(router, '/create', () => db.products.create());

POST(router, '/drop', () => db.products.drop());

POST(router, '/empty', () => db.products.empty());

// Get all products
GET(router, '/', () => db.products.all());

// Create new product
POST(router, '/', (req) => {
  return db.task(
    'add-product',
    async (task) =>
      await task.products.add({
        name: req.body.name,
        barcode: req.body.barcode,
      }),
  );
});

GET(router, '/:id', (req) => db.products.find({ id: req.params.id }));

export default router;
