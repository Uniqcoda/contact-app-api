import express from 'express';
import joi from '@hapi/joi';

import { contactsArray, idSchema } from './contacts';

const router = express.Router();

// A function that filters the contacts array for unblocked contacts
function getBlocked() {
	return contactsArray.filter(contact => contact.isBlocked === true);
}

// TO VIEW ALL BLOCKED CONTACTS
router.get('/', (_req, res, _next) => {
	const blockedContacts = getBlocked();
	if (blockedContacts.length) {
		res.status(200).json({ blockedContacts });
		return;
	}
	res.status(404).json({ error: `No blocked contacts.` });
});

// TO GET A BLOCKED CONTACT BY ID
router.get('/:contactId', (req, res, _next) => {
	const contactId: string = req.params.contactId;
	const { error, value } = joi.validate({ contactId }, idSchema, { abortEarly: false, stripUnknown: true });
	if (error) {
		res.status(400).json({ error });
		return;
	}

	const contact = contactsArray.find(contact => contact.id === value.contactId && contact.isBlocked);
	if (contact) {
		res.status(200).json({ contact });
		return;
	}
	res.status(404).json({ error: `No blocked contact was found with id - ${contactId}` });
});

// TO UNBLOCK A CONTACT
router.patch('/:contactId', (req, res, _next) => {
	const contactId: string = req.params.contactId;
	const body = req.body;

	const contact = contactsArray.find(contact => contact.id === contactId && contact.isBlocked);

	if (contact && body) {
		contact.isBlocked = false;
		res.status(200).json({ contact });
		return;
	}
	res.status(404).json({ error: `No blocked contact was found with id - ${contactId} ` });
});

export default router;
