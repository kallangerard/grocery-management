import request from 'supertest';
import app from '../src/app';

const apiBaseURI = '/api/v1';

it('Get /api/v1 should return 200 and Grocery JSON', async (done) => {
  const response = await request(app).get('/api/v1');
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('Grocery Management API');
  done();
});
