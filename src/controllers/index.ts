import { Contact } from '../models/contacts.model';
import { ICreateContact } from '../models/contacts.model';
import joi from '@hapi/joi';

export function getAllContacts() {
	return Contact.find({ isBlocked: false })
		.then(data => data)
		.catch(err => err);
}

export function getBlockedContacts() {
	return Contact.find({ isBlocked: true })
		.then(data => data)
		.catch(err => err);
}

export function getContactById(id: string) {
	return Contact.findById(id)
		.then(data => data)
		.catch(err => err);
}

export function getContact(query: string) {
	return Contact.find({
		$or: [{ firstName: query }, { lastName: query }, { phone: query }],
	})
		.then(data => data)
		.catch(err => err);
}

// the phone num should either start with country code or 0 (example +2348067546986, or 08067546986)
const phoneNumRegex = /^(\+[0-9]{3}|0)[0-9]{10}$/;

// a schema that describes the contact object
export const contactSchema = {
	firstName: joi
		.string()
		.trim()
		.required(),
	lastName: joi
		.string()
		.trim()
		.optional()
		.allow(''),
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
		.email()
		.allow(''),
};

// a schema that describes the update contact object
export const updateContactSchema = {
	firstName: joi.string(),
	lastName: joi.string(),
	phone: joi.string().regex(phoneNumRegex),
	email: joi.string().email(),
	isBlocked: joi.boolean(),
};

export function createContact(contactBody: ICreateContact) {
	const { error, value } = joi.validate(contactBody, contactSchema, {
		skipFunctions: true,
		stripUnknown: true,
		abortEarly: false,
	});
	if (error) {
		throw new Error('Contact body is not valid');
	}
	const contact = new Contact(value);
	return contact.save();
}
