import request from 'supertest';
import app from '../src/app';

const apiBaseURI = '/api/v1';

test('GET /api/v1 should return 200 and Grocery JSON', async (done) => {
  const response = await request(app).get(apiBaseURI);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('Grocery Management API');
  done();
});
