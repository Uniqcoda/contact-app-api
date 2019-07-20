import express from 'express';
import joi from '@hapi/joi';
import { Contact } from '../models/contacts.model';

const router = express.Router();

interface IUpdateContact {
	isBlocked: boolean;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}

// the phone num should either start with country code or 0 (example +2348067546986, or 08067546986)
const phoneNumRegex = /^(\+[0-9]{3}|0)[0-9]{10}$/;

// a schema that describes the contact object
const contactSchema = {
	firstName: joi
		.string()
		.trim()
		.required(),
	lastName: joi
		.string()
		.trim()
		.optional(),
	phone: joi
		.string()
		.required()
		.trim()
		.regex(phoneNumRegex),
	email: joi
		.string()
		.optional()
		.lowercase()
		.trim()
		.email(),
};

// a schema that describes the update contact object
const updateContactSchema = {
	firstName: joi.string(),
	lastName: joi.string(),
	phone: joi.string().regex(phoneNumRegex),
	email: joi.string().email(),
	isBlocked: joi.boolean(),
};

// TO ADD A CONTACT
router.post('/', (req, res, _next) => {
	const { error, value } = joi.validate(
		req.body,
		{ ...contactSchema },
		{
			abortEarly: false,
			stripUnknown: true,
		}
	);

	if (error) {
		res.status(400).json({ error });

		return;
	}

	const newContact = new Contact({ ...value });

	newContact
		.save()
		.then(() => res.status(200).json({ message: 'Contact created successfully', newContact: newContact }))
		.catch(err => res.status(400).json(`Error: ${err}`));
});

// TO GET ALL CONTACTS
router.get('/', (_req, res, _next) => {
	Contact.find({ isBlocked: false })
		.then(contacts => res.status(200).json({ contacts: contacts }))
		.catch(err => res.status(400).json(`Error: ${err}`));
});

//  TO GET A CONTACT BY ID
router.get('/:contactId', (req, res, _next) => {
	Contact.findById(req.params.contactId)
		.then(contact => res.status(200).json({ contact: contact }))
		.catch(err => res.status(400).json(`${err}`));
});

// TO DELETE A CONTACT BY ID
router.delete('/:contactId', (req, res, _next) => {
	Contact.findByIdAndDelete(req.params.contactId)
		.then(contact => {
			res.status(200).json(`${contact!.firstName} ${contact!.lastName}'s contact deleted!`);
		})
		.catch(err => res.status(400).json(`Error: ${err}`));
});

// TO UPDATE A CONTACT BY ID
router.patch('/:contactId', (req, res, _next) => {
	const { error, value } = joi.validate<IUpdateContact>(req.body, updateContactSchema, {
		abortEarly: false,
		stripUnknown: true,
	});

	if (error) {
		res.status(400).json({ error });

		return;
	}

	// a contact can be blocked and unblocked this way
	Contact.findByIdAndUpdate(req.params.contactId, { $set: value, new: true })
		.then(() => {
			res.status(200).json('Update was successful');
		})
		.catch(err => res.status(400).json(`Error: ${err}`));

	// res.status(404).json({ error: `No contact was found with id - ${contactId}, contact could have been be blocked` });
});

export default router;
