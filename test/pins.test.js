require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Pin = require('../lib/models/Pin');

describe('pin routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('can create a pin', () => {
    return request(app)
      .post('/api/v1/pins')
      .send({
        title: 'this is a title',
        address: 'portland.',
        user: 'erin',
        startTime: '8pm',
        endTime: '10pm'
      })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          title: 'this is a title',
          address: 'portland.',
          user: 'erin',
          startTime: '8pm',
          endTime: '10pm',
          __v: 0
        });
      });
  });

  it('can get an array of pins with GET', async() => {
    await Pin.create([
      { title: 'this is a title',
        address: 'portland.',
        user: 'erin',
        startTime: '8pm',
        endTime: '10pm' },

      { title: 'this is a title2',
        address: 'birmingham',
        user: 'kayt',
        startTime: '7pm',
        endTime: '11pm' }
    ]);
    return request(app)
      .get('/api/v1/pins')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          title: 'this is a title2', 
          address: 'birmingham',
          user: 'kayt',
          startTime: '7pm',
          endTime: '11pm',
          __v: 0
        });
      });
  });
});
