import request from 'supertest';
import app from '../src/app';

describe('API Routes', () => {
	// TO ADD A CONTACT

	// TO GET ALL CONTACTS
	test('/contacts returns all non-blocked contacts', () => {
		return request(app)
			.get('/contacts')
			.expect(200, { contacts: [] });
	});

  test('/home ', () => {
    return request(app)
      .post('/home')
      .send({})
      .expect(res => {
        res.body;
      });
  });
});
