equire('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

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
      .send({
        where: 'this is a where',
        message: 'this is a message',
        address: 'alchemy code lab',
        user: 'erin',
        startTime: '8pm',
        endTime: '10pm'
      })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          where: 'this is a where',
          message: 'this is a message',
          lat: expect.any(Number),
          lng: expect.any(Number),
          address: expect.any(String),
          user: 'erin',
          startTime: '8pm',
          endTime: '10pm',
          __v: 0
        });
      });
  });