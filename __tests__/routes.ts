import request from 'supertest';
import app from '../src/app';
// import { ICreateContact, ICreateContactResponse } from '../src/routes/contacts';

const demoContact1 = { firstName: 'Ochuko', lastName: 'Ekrresa', phone: '+2348056431780', email: 'ochukoe@yah.com' };
const demoContact2 = { lastName: 'Ekrresa', phone: '+2348056431780', email: 'ochukoe@yah.com' };
const demoContact3 = { firstName: 'Jane', phone: '+2348056431780' };
const demoContact4 = { firstName: 'Dlamini', lastName: 'Fishbourn', phone: '+2348056431780', email: 'ochukoe@yah.com' };

describe('API Routes', () => {
	// TO GET ALL CONTACTS
	test('/contacts returns all non-blocked contacts', () => {
		return request(app)
			.get('/contacts')
			.expect('Content-Type', /json/)
			.expect(200);
	});

	// TO ADD A CONTACT
	test('/contacts to add a contact', () => {
		return request(app)
			.post('/contacts')
			.send(demoContact1)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
	});

	test('/contacts to confirm that a new contact can contain only first name and phone number', () => {
		return request(app)
			.post('/contacts')
			.send(demoContact3)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
	});

	test('/contacts will refuse to add a contact with invalid or incomplete properties', () => {
		return request(app)
			.post('/contacts')
			.send(demoContact2)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
	});

	test('/contacts to add another contact', () => {
		return request(app)
			.post('/contacts')
			.send(demoContact4)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
	});

	//  TO GET A CONTACT BY ID
	test('/contacts/:contactId returns a contact by id', () => {
		return request(app)
			.get('/contacts/5d30ee26672b4233cbc59bfe')
			.expect(200)
	});

	test('/contacts/:contactId returns an error if there is no contact with the id', () => {
		return request(app)
			.get('/contacts/55')
			.expect(400);
	});

	// TO DELETE A CONTACT BY ID
	test('/:contactId deletes a contact by id', () => {
		return request(app)
			.delete('/contacts/5d30ea77fb6f6a339a5376b2')
			.expect(200)
	});

	test('/:contactId returns error message if id is invalid, for delete method', () => {
		return request(app)
			.delete('/contacts/ujfkoslks')
			.expect(400);
	});

	// TO UPDATE A CONTACT BY ID
	test('/contacts/:contactId updates a contact by id', () => {
		return request(app)
			.patch('/contacts/5d30ea77fb6f6a339a5376b2')
			.send({ lastName: 'Ogundipe' })
			.expect(200)
	});

	// TO BLOCK A CONTACT BY ID
	test('/contacts/:contactId can block a contact by id', () => {
		return request(app)
			.patch('/contacts/5d30ee26672b4233cbc59bfe')
			.send({ isBlocked: true })
			.expect(200)
	});

	// TO VIEW ALL BLOCKED CONTACTS
	test('/contacts returns all blocked contacts', () => {
		return request(app)
			.get('/blocked-contacts')
			.expect(200)
	});

	// // TO GET A BLOCKED CONTACT BY ID
	// test('/blocked-contacts/:contactId returns a blocked contact by id', () => {
	// 	return request(app)
	// 		.get('/blocked-contacts/3')
	// 		.expect(200)
	// 		.expect(res => {
	// 			// console.log(res.body);
	// 			expect(res.body.contact.isBlocked).toBe(true);
	// 		});
	// });

	// TO UNBLOCK A CONTACT
	test('/contacts/:contactId can unblock a contact by id', () => {
		return request(app)
			.patch('/contacts/5d30edaa672b4233cbc59bfd')
			.send({ isBlocked: false })
			.expect(200)
	});
});
