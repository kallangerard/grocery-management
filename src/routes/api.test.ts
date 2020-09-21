import request from 'supertest';
import app from '../app';

describe('Get /api/v1', () => {
  it('should return 200 OK', () => {
    return request(app).get('/api/v1').expect(200);
  });
});
