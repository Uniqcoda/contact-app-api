import request from 'supertest';
import app from '../src/app';

let demoContact1 = { firstName: 'Ochuko', lastName: 'Ekrresa', phone: '+2348056431780', email: 'ochukoe@yah.com' };
let demoContact2 = { lastName: 'Ekrresa', phone: '+2348056431780', email: 'ochukoe@yah.com' };
let demoContact3 = { firstName: 'Jane', phone: '+2348056431780' };
let demoContact4 = { firstName: 'Dlamini', lastName: 'Fishbourn', phone: '+2348056431780', email: 'ochukoe@yah.com' };

	// TO GET ALL CONTACTS
	test('/contacts returns all non-blocked contacts', () => {
		return request(app)
			.get('/contacts')
			.expect(200, { contacts: [] });
	});

	// TO ADD A CONTACT
	test('/contacts to add a contact', () => {
		let demoContact = { firstName: 'Ochuko', lastName: 'Ekrresa', phone: '+2348056431780', email: 'ochukoe@yah.com' };
		return request(app)
			.post('/contacts')
			.send(demoContact1)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect(res => {
				// console.log(res.body);
				expect(res.body.newContact.value).toEqual(demoContact1);
			});
  });
  
	test('/contacts to confirm that a new contact can contain only first name and phone number', () => {
		return request(app)
			.post('/contacts')
			.send(demoContact3)
			.expect(200)
			.expect(res => {
				// console.log(res.body);
				expect(res.body.newContact.value).toEqual(demoContact3);
			});
	});

	test('/contacts will refuse to add a contact with invalid or incomplete properties', done => {
		return request(app)
			.post('/contacts')
			.send(demoContact2)
			.expect(400)
			.end(err => {
				if (err) return done(err);
				console.log(res.body);
				done();
			});
	});

	test('/contacts to add a contact', () => {
		return request(app)
			.post('/contacts')
			.send(demoContact4)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect(res => {
				// console.log(res.body);
				expect(res.body.newContact.value).toEqual(demoContact4);
			});
	});

	//  TO GET A CONTACT BY ID
	test('/contacts/:contactId returns a contact by id', () => {
		return request(app)
			.get('/contacts/2')
			.expect(200)
			.expect(res => {
				// console.log(res.body);
				expect(res.body.contact.id).toBe(2);
			});
	});

	test('/contacts/:contactId returns an error if there is no contact with the id', () => {
		return request(app)
			.get('/contacts/55')
			.expect(404, { error: 'No contact was found with id - 55, contact could be blocked' });
	});

	// TO DELETE A CONTACT BY ID
	// TO UPDATE A CONTACT

  // TO VIEW ALL BLOCKED CONTACTS
  test('/contacts returns all blocked contacts', () => {
		return request(app)
			.get('/blocked-contacts')
			.expect(200, { blockedContacts: [] });
  });
});
