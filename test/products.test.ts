import request from 'supertest';
import app from '../src/app';

const apiBaseURI = '/api/v1';
const endPoint = '/products';

const testProducts = [
  { name: 'Bananas', barcode: '123456' },
  { name: 'Apples', barcode: '234567' },
  { name: 'Carrots', barcode: '345678' },
];

beforeAll(async (done) => {
  await request(app).post(apiBaseURI + endPoint + '/drop');
  await request(app).post(apiBaseURI + endPoint + '/create');

  testProducts.forEach(async (product) => {
    await request(app)
      .post(apiBaseURI + endPoint)
      .send(product);
  });

  done();
});
test('GET all products should return 200 and all products', async (done) => {
  const response = await request(app).get(apiBaseURI + endPoint);

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body).toBeDefined;
  expect(response.body.data[0].id).toBe(1);
  done();
});

test('GET single product should return 200 OK and product of ID 1', async (done) => {
  const response = await request(app).get(apiBaseURI + endPoint + '/1');
  expect(response.status).toBe(200);
  expect(response.body.data.id).toBe(1);
  done();
});

test('POST Create a product should return 200 and created product', async (done) => {
  const input = {
    name: 'milk',
    barcode: '111111',
  };

  const response = await request(app)
    .post(apiBaseURI + endPoint)
    .send(input);

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data.barcode).toBe('111111');
  done();
});

test('POST Creating duplicate product should return failure', async (done) => {
  const input = testProducts[0];

  const response = await request(app)
    .post(apiBaseURI + endPoint)
    .send(input);

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
  expect(response.body.error).toEqual(
    expect.stringContaining('duplicate key value violates unique constraint'),
  );
  done();
});
