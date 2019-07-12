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
	value: ICreateContact;
}
const contact1: ICreateContactResponse = {
	id: '1',
	createdAt: 'today',
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
	value: {
		firstName: 'Ochuko',
		lastName: 'Ekrresa',
		phone: '+2348056431780',
		email: 'ochukoe@yah.com',
	},
};

const contactsArray: ICreateContactResponse[] = [contact1, contact2];
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
const idSchema = {
	contactId: joi.string().required(),
};

// TO ADD A CONTACT
router.post('/', (req, res, _next) => {
	const contact = req.body;
	const { error, value } = joi.validate<ICreateContact>(contact, schema, { abortEarly: false, stripUnknown: true });
	if (error) {
		res.status(400).json({ error });
		return;
	}
	const id = new Date().getTime().toString();
	const createdAt = new Date().toLocaleDateString();
	const data = { value, id, createdAt };
	contactsArray.push(data);

	res.status(200).json({ data });
});

// TO READ ALL CONTACTS
router.get('/', (_req, res, _next) => {
	res.status(200).json(contactsArray);
});

//  TO GET A CONTACT BY ID
router.get('/:contactId', (req, res, _next) => {
	const { error, value: contactId } = joi.validate(req.params, idSchema, { abortEarly: false, stripUnknown: true });
	if (error) {
		res.status(400).json({ error });
		return;
	}
	const data = contactsArray.find(contact => contact.id === contactId);
	res.status(200).json({ data });
});
export default router;
