require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Pin = require('../lib/models/Pin');

jest.mock('../lib/middleware/ensure-auth.js');

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
        where: 'this is a where',
        message: 'this is a message',
        address: 'alchemy code lab',
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
          user: expect.any(String),
          startTime: '8pm',
          endTime: '10pm',
          __v: 0
        });
      });
  });

  it('can UPDATE a pin', async() => {
    const pin = await Pin.create({ 
      where: 'this is a where2',
      message: 'this is a message2',
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
    return request(app)
      .post('/api/v1/pins')
      .send({
        where: 'this is a where2',
        message: 'this is a message',
        address: 'alchemy code lab',
        startTime: '8pm',
        endTime: '10pm'
      })
      .then(res => {
        return request(app)
          .delete(`/api/v1/pins/${res.body._id}`)
          .then(res => {
            expect(res.body.where).toEqual('this is a where2');
          });
      });
  });
});
