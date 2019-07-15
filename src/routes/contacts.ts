import express from 'express';
import joi from '@hapi/joi';

const router = express.Router();

export interface ICreateContact {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}

interface IUpdateContact {
	isBlocked: boolean;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}

export interface ICreateContactResponse {
	id: number; // the auto generated id of the new contact
	createdAt: string; // the ISO date of when the contact was created
	isBlocked: boolean;
	value: ICreateContact;
}

export const contactsArray: ICreateContactResponse[] = [];
// id generator
function idGenerator() {
	const newId = contactsArray.length ? contactsArray[contactsArray.length - 1].id + 1 : 1;
	return newId;
}

// A function that filters the contacts array for unblocked contacts
function getUnblocked() {
	return contactsArray.filter(contact => contact.isBlocked === false);
}

// the phone num should either start with country code or 0 (example +2348067546986, or 08067546986)
const phoneNumRegex = /^(\+[0-9]{3}|0)[0-9]{10}$/;

// a schema that describes the contact object
const contactSchema = {
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

// a schema that describes the update contact object
const updateContactontactSchema = {
	firstName: joi.string(),
	lastName: joi.string(),
	phone: joi.string().regex(phoneNumRegex),
	email: joi.string().email(),
	isBlocked: joi.boolean(),
};

// a schema that describes the contact id
export const idSchema = {
	contactId: joi
		.number()
		.integer()
		.required(),
};

// TO ADD A CONTACT
router.post('/', (req, res, _next) => {
	const { error, value } = joi.validate<ICreateContact>(req.body, contactSchema, {
		abortEarly: false,
		stripUnknown: true,
	});

	if (error) {
		res.status(400).json({ error });

		return;
	}

	const id = idGenerator();
	const createdAt = new Date().toISOString();
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
});

//  TO GET A CONTACT BY ID
router.get('/:contactId', (req, res, _next) => {
	const {
		error,
		value: { contactId },
	} = joi.validate<{ contactId: number }>(req.params, idSchema, { abortEarly: false, stripUnknown: true });

	if (error) {
		res.status(400).json({ error });
		return;
	}

	const contact = contactsArray.find(contact => contact.id === contactId && !contact.isBlocked);
	if (contact) {
		res.status(200).json({ contact });
		return;
	}
	res.status(404).json({ error: `No contact was found with id - ${contactId}, contact could be blocked` });
});

// TO DELETE A CONTACT BY ID
router.delete('/:contactId', (req, res, _next) => {
	const {
		error,
		value: { contactId },
	} = joi.validate<{ contactId: number }>(req.params, idSchema, { abortEarly: false, stripUnknown: true });

	if (error) {
		res.status(400).json({ error });
		return;
	}

	for (const index in contactsArray) {
		const contact = contactsArray[index];
		if (contact.id === contactId) {
			contactsArray.splice(Number(index), 1);
			const contacts = getUnblocked();
			res.status(200).json({ contacts });
			return;
		}
	}
	res.status(404).json({ error: `No contact was found with id - ${contactId} ` });
});

// TO UPDATE A CONTACT
router.patch('/:contactId', (req, res, _next) => {
	const contactId: number = Number(req.params.contactId);
  const body = req.body;
  // validate update email
	if (body.email) {
		const { error } = joi.validate(body.email, contactSchema.email, { abortEarly: false, stripUnknown: true });
		if (error) {
			res.status(400).json({ error });
			return;
		}
  }
  //validate update phone number
	if (body.phone) {
		const { error } = joi.validate(body.phone, contactSchema.phone, { abortEarly: false, stripUnknown: true });
		if (error) {
			res.status(400).json({ error });
			return;
		}
  }
  // confirm that contact with id exists
	const contact = contactsArray.find(contact => contact.id === contactId && !contact.isBlocked);

	if (contact && body) {
		contact.value.firstName = body.firstName || contact.value.firstName;
		contact.value.lastName = body.lastName || contact.value.lastName;
		contact.value.phone = body.phone || contact.value.phone;
		contact.value.email = body.email || contact.value.email;
		// to block the contact
		if (body.isBlocked) {
			contact.isBlocked = true;
		}
		res.status(200).json({ contact });
		return;
	}
	res.status(404).json({ error: `No contact was found with id - ${contactId}, contact could have been be blocked` });
});

export default router;
