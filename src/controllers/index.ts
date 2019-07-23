import { Contact } from '../models/contacts.model';

export function getContacts() {
	return Contact.find({ isBlocked: false })
		.then(data => data)
		.catch(err => err);
}

export function getBlockedContacts() {
	return Contact.find({ isBlocked: true })
		.then(data => data)
		.catch(err => err);
}

export function getContact(contactId: string) {
	return Contact.findById(contactId)
		.then(data => data)
		.catch(err => err);
}
