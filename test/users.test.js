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
          name: 'bob@bob.com',
          email: 'bob@bob.com',
          authId: '1234',
          followers: [],
          __v: 0
        });
      });
  });

  it('can get a list of users', () => {
    return request(app)
      .post('/api/v1/users')
      .then(() => {
        return request(app)
          .get('/api/v1/users')
          .then(res => {
            expect(res.body).toContainEqual({
              _id: expect.any(String),
              name: 'bob@bob.com',
              email: 'bob@bob.com',
              authId: '1234',
              followers: [],
              __v: 0
            });
          });
      });
  });

  it('can add a follower to the followers array', async() => {
    await User.create([
      {
        name: 'bob',
        email: 'bob@bob.com',
        authId: '1234'
      },
      {
        name: 'sarah',
        email: 'sarah@sarah.com',
        authId: '4321'
      }
    ]);

    return request(app)
      .patch('/api/v1/users/followers')
      .send({ email: 'sarah@sarah.com' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'bob',
          email: 'bob@bob.com',
          authId: '1234',
          followers: ['4321'],
          __v: 0
        });
      });
  });
});
