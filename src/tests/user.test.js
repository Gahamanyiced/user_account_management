import { expect, use } from 'chai';
import chaitHttp from 'chai-http';
import request from 'supertest';
import app from "../../app.js";
import 'dotenv/config.js';
import { newUser } from './mocks/user.mock.js';
import { userToken } from './mocks/token.mocks.js';

use(chaitHttp);

describe('USER AUTH', async () => {
  it('should sign up new user', (done) => {
    request(app)
      .post('api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);        
        done();
      });
  });
});
