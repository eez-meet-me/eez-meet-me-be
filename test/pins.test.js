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
        address: 'alchemy code lab',
        user: 'erin',
        startTime: '8pm',
        endTime: '10pm'
      })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          title: 'this is a title',
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

  it('can get an array of pins with GET', async() => {
    await Pin.create([
      { title: 'this is a title',
        lat: 24,
        lng: 24,
        address: 'portland, or',
        user: 'erin',
        startTime: '8pm',
        endTime: '10pm' },

      { title: 'this is a title2',
        lat: 26,
        lng: 27,
        address: 'birmingham, al',
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
          lat: expect.any(Number),
          lng: expect.any(Number),
          address: expect.any(String),
          user: 'kayt',
          startTime: '7pm',
          endTime: '11pm',
          __v: 0
        });
      });
  });

  it('can UPDATE a pin', async() => {
    const pin = await Pin.create({ 
      title: 'this is a title2',
      lat: 24,
      lng: 24,
      address: 'birmingham',
      user: 'kayt',
      startTime: '7pm',
      endTime: '11pm'
    });

    return request(app)
      .put(`/api/v1/pins/${pin._id}`)
      .send({ endTime: '12:00 pm' })
      .then(res => {
        expect(res.body.endTime).toEqual('12:00 pm');
      });
  });

  it('can DELETE a pin', async() => {
    const pin = await Pin.create({ 
      title: 'this is a title2',
      lat: 24,
      lng: 24,
      address: 'birmingham',
      user: 'kayt',
      startTime: '7pm',
      endTime: '11pm'
    });
    return request(app)
      .delete(`/api/v1/pins/${pin._id}`)
      .then(res => {
        expect(res.body.title).toEqual('this is a title2');
      });
  });
});
