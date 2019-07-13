import express from 'express';
import { contactsArray } from './contacts';

const router = express.Router();

// A function that filters the contacts array for unblocked contacts
function getBlocked() {
	return contactsArray.filter(contact => contact.isBlocked === true);
}

// TO VIEW ALL BLOCKED CONTACTS
router.get('/', (_req, res, _next) => {
	const blockedContacts = getBlocked();
	if (blockedContacts) {
		res.status(200).json({ blockedContacts });
		return;
	}
	res.status(404).json({ error: `No blocked contacts.` });
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
