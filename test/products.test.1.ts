import request from 'supertest';
import app from '../src/app';

const apiBaseURI = '/api/v1';
const endPoint = '/products';

test('GET all products should return 200 and all products', async (done) => {
  const response = await request(app).get(apiBaseURI + endPoint);

  expect(response.status).toBe(200);
  expect(response.body.products).toBe('products');
  expect(response.body.products).toBeDefined();
  done();
});

test('GET single product should return 200 OK and product of ID 1', async (done) => {
  const response = await request(app).get(apiBaseURI + endPoint + '/1');

  expect(response.status).toBe(200);
  expect(response.body.product).toBeDefined();
  done();
});

test('POST Create a product should return 200 and created product', async (done) => {
  const input = {
    name: 'milk',
    barcode: '123456',
  };

  const response = await request(app)
    .post(apiBaseURI + endPoint)
    .send(input);

  expect(response.status).toBe(200);
  expect(response.body.barcode).toBe('123456');
  done();
});
