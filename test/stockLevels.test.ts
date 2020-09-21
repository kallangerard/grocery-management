import request from 'supertest';
import app from '../src/app';

const apiBaseURI = '/api/v1';
const endPoint = '/stock_levels';

test('POST Product consumed event created should return 200', async (done) => {
  const input = {
    barcode: '123456',
    quantity: -1,
  };
  const output = {
    uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
    event: 'product_consumed',
    action: {
      barcode: '123456',
      quantity: -1,
    },
    inserted_at: 'timestamp',
  };

  const response = await request(app)
    .post(apiBaseURI + endPoint + '/transact')
    .send(input);

  expect(response.status).toBe(200);
  expect(response.body.event).toBe(output.event);
  expect(response.body.action.barcode).toBe(output.action.barcode);
  expect(response.body.action.quantity).toBe(output.action.quantity);
  done();
});
test('POST Product purchased event created should return 200', async (done) => {
  const input = {
    barcode: '123456',
    quantity: 1,
  };
  const output = {
    uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
    event: 'product_purchased',
    action: {
      barcode: '123456',
      quantity: 1,
    },
    inserted_at: 'timestamp',
  };

  const response = await request(app)
    .post(apiBaseURI + endPoint + '/transact')
    .send(input);

  expect(response.status).toBe(200);
  expect(response.body.event).toBe(output.event);
  expect(response.body.action.barcode).toBe(output.action.barcode);
  expect(response.body.action.quantity).toBe(output.action.quantity);
  done();
});
