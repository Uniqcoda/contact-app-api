import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } from 'graphql';
import {
	getAllContacts,
	getBlockedContacts,
	getContactById,
	createContact,
	updateContactById,
} from './controllers/resolve_functions';
import { ContactType, ContactInput } from './graphql_types/types';

const query = new GraphQLObjectType({
	name: 'ContacticaApp',
	description: 'The root query of Contactica App.',
	fields: () => ({
		contacts: {
			type: new GraphQLList(ContactType),
			description: 'All the unblocked contacts',
			resolve: () => getAllContacts(),
		},
		blockedContacts: {
			type: new GraphQLList(ContactType),
			description: 'All the blocked contacts',
			resolve: () => getBlockedContacts(),
		},
		contact: {
			type: ContactType,
			description: 'Info about a single contact',
			args: {
				id: {
					type: GraphQLString,
					description: 'The ID of the contact to fetch',
				},
			},
			resolve: (_, { id }) => getContactById(id),
		},
	}),
});

const mutation = new GraphQLObjectType({
	name: 'ContactMutations',
	description: 'All the mutations supported by Contactica App.',
	fields: () => ({
		createContact: {
			type: ContactType,
			description: 'Create a new contact',
			args: {
				input: {
					type: ContactInput,
					description: 'The values to create a new contact',
				},
			},
			resolve: (_, args) => createContact(args.input),
		},
		updateContact: {
			type: ContactType,
			description: 'Create a new contact',
			args: {
				id: {
					type: GraphQLString,
					description: 'The ID of the contact to fetch',
				},
				input: {
					type: ContactInput,
					description: 'The values to update a contact',
				},
			},
			resolve: (_, args) => updateContactById(args.id, args.input),
		},
	}),
});

const schema = new GraphQLSchema({
	query,
	mutation,
});

export default schema;
