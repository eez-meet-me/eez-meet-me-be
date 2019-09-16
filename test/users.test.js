require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

jest.mock('../lib/middleware/ensure-auth.js');

describe('user routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('can create a user', () => {
    return request(app)
      .post('/api/v1/users')
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          firstName: 'eli',
          lastName: 'nicholson',
          email: 'bob@bob.com',
          city: 'Portland, OR',
          bio: 'this is a bio',
          authId: '1234',
          __v: 0
        });
      });
  });
});
