import express from 'express';
import joi from '@hapi/joi';

const router = express.Router();

interface ICreateContact {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}

interface ICreateContactResponse {
	id: string; // the auto generated id of the new contact
	createdAt: string; // the ISO date of when the contact was created
	isBlocked: boolean;
	value: ICreateContact;
}
const contact1: ICreateContactResponse = {
	id: '1',
	createdAt: 'today',
	isBlocked: false,
	value: {
		firstName: 'Ochuko',
		lastName: 'Ekrresa',
		phone: '+2348056431780',
		email: 'ochukoe@yah.com',
	},
};
const contact2: ICreateContactResponse = {
	id: '2',
	createdAt: 'today',
	isBlocked: true,
	value: {
		firstName: 'Ochuko',
		lastName: 'Ekrresa',
		phone: '+2348056431780',
		email: 'ochukoe@yah.com',
	},
};
const contact3: ICreateContactResponse = {
	id: '3',
	createdAt: 'today',
	isBlocked: true,
	value: {
		firstName: 'Izu',
		lastName: 'Ogbodo',
		phone: '+2348056431780',
		email: 'izuo@yah.com',
	},
};
const contact4: ICreateContactResponse = {
	id: '4',
	createdAt: 'today',
	isBlocked: false,
	value: {
		firstName: 'Esty',
		lastName: 'Ogundijo',
		phone: '+2348056431780',
		email: 'estyo@yah.com',
	},
};

export const contactsArray: ICreateContactResponse[] = [contact1, contact2, contact3, contact4];

// A function that filters the contacts array for unblocked contacts
function getUnblocked() {
	return contactsArray.filter(contact => contact.isBlocked === false);
}

// the phone num should either start with country code or 0 (example +2348067546986, or 08067546986)
const phoneNumRegex = /^(\+[0-9]{3}|0)[0-9]{10}$/;

const schema = {
	firstName: joi.string().required(),
	lastName: joi.string().optional(),
	phone: joi
		.string()
		.required()
		.regex(phoneNumRegex),
	email: joi
		.string()
		.optional()
		.email(),
};
export const idSchema = {
	contactId: joi.string().required(),
};

// TO ADD A CONTACT
router.post('/', (req, res, _next) => {
	const contact: ICreateContact = req.body;
	const { error, value } = joi.validate(contact, schema, { abortEarly: false, stripUnknown: true });
	if (error) {
		res.status(400).json({ error });
		return;
	}
	const id = new Date().getTime().toString();
	const createdAt = new Date().toLocaleDateString();
	const isBlocked = false;
	const newContact = { id, createdAt, isBlocked, value };
	contactsArray.push(newContact);
	res.status(200).json({ newContact });
});

// TO GET ALL CONTACTS
router.get('/', (_req, res, _next) => {
	const contacts = getUnblocked();
	if (contacts) {
		res.status(200).json({ contacts });
		return;
	}
	res.status(404).json({ error: `No contacts available, also check your blocked contacts.` });
});

//  TO GET A CONTACT BY ID
router.get('/:contactId', (req, res, _next) => {
	const contactId: string = req.params.contactId;
	const { error, value } = joi.validate({ contactId }, idSchema, { abortEarly: false, stripUnknown: true });
	if (error) {
		res.status(400).json({ error });
		return;
	}

	const contact = contactsArray.find(contact => contact.id === value.contactId && !contact.isBlocked);
	if (contact) {
		res.status(200).json({ contact });
		return;
	}
	res.status(404).json({ error: `No contact was found with id - ${contactId}, contact could be blocked` });
});

// TO DELETE A CONTACT BY ID
router.delete('/:contactId', (req, res, _next) => {
	const contactId: string = req.params.contactId;
	const { error, value } = joi.validate({ contactId }, idSchema, { abortEarly: false, stripUnknown: true });
	if (error) {
		res.status(400).json({ error });
		return;
	}

	for (const index in contactsArray) {
		const contact = contactsArray[index];
		if (contact.id === value.contactId) {
			contactsArray.splice(Number(index), 1);
			const unblockedContacts = getUnblocked();
			res.status(200).json({ unblockedContacts });
			return;
		}
	}
	res.status(404).json({ error: `No contact was found with id - ${contactId} ` });
});

// TO UPDATE A CONTACT
router.patch('/:contactId', (req, res, _next) => {
	const contactId: string = req.params.contactId;
	const body = req.body;
	const contact = contactsArray.find(contact => contact.id === contactId && !contact.isBlocked);

	if (contact && body) {
		contact.value.firstName = body.firstName || contact.value.firstName;
		contact.value.lastName = body.lastName || contact.value.lastName;
		contact.value.phone = body.phone || contact.value.phone;
		contact.value.email = body.email || contact.value.email;
		contact.isBlocked = body.isBlocked || contact.isBlocked;
		res.status(200).json({ contact });
		return;
	}
	res.status(404).json({ error: `No contact was found with id - ${contactId}, contact could have been be blocked` });
});

export default router;
