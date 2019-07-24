import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } from 'graphql';
import { getAllContacts, getBlockedContacts, getContactById, createContact } from './controllers/index';
import { ContactType, ContactInput } from './types/contactType';

const query = new GraphQLObjectType({
	name: 'ContacticaApp',
	description: 'The query root of Contactica App.',
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
			resolve: (_, { id }) => {
				return getContactById(id);
			},
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
	}),
});

const schema = new GraphQLSchema({
	query,
	mutation,
});

export default schema;
