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

	//  TO GET A CONTACT BY ID
	// test('/:contactId returns a contact by id', () =>{
	//   return request(app).get('/contacts/1').expect(200, { contact: [] })
	// })

	test('/:contactId returns an error if there is no contact with the id', () => {
		return request(app)
			.get('/contacts/1')
			.expect(404, { error: 'No contact was found with id - 1, contact could be blocked' });
	});
  });
});
