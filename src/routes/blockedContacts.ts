import express from 'express';
import joi from '@hapi/joi';

import { contactsArray, idSchema } from './contacts';

const router = express.Router();

// A function that filters the contacts array for unblocked contacts
function getBlocked() {
	return contactsArray.filter(contact => contact.isBlocked === true);
}

const schema = {
	isBlocked: joi.boolean().required(),
};

// TO VIEW ALL BLOCKED CONTACTS
router.get('/', (_req, res, _next) => {
	const blockedContacts = getBlocked();

	res.status(200).json({ blockedContacts });
});

// TO GET A BLOCKED CONTACT BY ID
router.get('/:contactId', (req, res, _next) => {
	const {
		error,
		value: { contactId },
	} = joi.validate<{ contactId: number }>(req.params, idSchema, { abortEarly: false, stripUnknown: true });

	if (error) {
		res.status(400).json({ error });
		return;
	}

	const contact = contactsArray.find(contact => contact.id === contactId && contact.isBlocked);
	if (contact) {
		res.status(200).json({ contact });
		return;
	}
	res.status(404).json({ error: `No blocked contact was found with id - ${contactId}` });
});

// TO UNBLOCK A CONTACT
router.patch('/:contactId', (req, res, _next) => {
	const contactId = Number(req.params.contactId);
	const isBlocked: boolean = req.body.isBlocked;
	const { error, value } = joi.validate({ isBlocked }, schema, { abortEarly: false, stripUnknown: true });
	if (error) {
		res.status(400).json({ error });
		return;
	}

	const contact = contactsArray.find(contact => contact.id === contactId && contact.isBlocked);

	if (contact && value) {
		contact.isBlocked = false;
		res.status(200).json({ contact });
		return;
	}
	res.status(404).json({ error: `No blocked contact was found with id - ${contactId} ` });
});

export default router;
