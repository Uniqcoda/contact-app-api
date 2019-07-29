import { GraphQLObjectType,GraphQLInputObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { ICreateContact } from '../models/contacts.model';

export const ContactType = new GraphQLObjectType<ICreateContact>({
	name: 'Contact',
	description: 'Information about a single contact',
	fields: () => ({
		id: {
			type: GraphQLString,
			description: 'The unique id of the contact',
			resolve: data => data._id,
		},
		firstName: {
			type: GraphQLString,
			description: 'The first name of the contact',
		},
		lastName: {
			type: GraphQLString,
			description: 'The last name of the contact',
		},
		phone: {
			type: GraphQLString,
			description: 'The phone number of the contact',
		},
		email: {
			type: GraphQLString,
			description: 'The email address of the contact',
		},
		isBlocked: {
			type: GraphQLBoolean,
			description: 'True if the contact is blocked',
		},
	}),
});

export const ContactInput = new GraphQLInputObjectType({
	name: 'ContactInput',
	description: 'Information about creating a single contact',
	fields: () => ({
		firstName: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The first name of the contact',
		},
		lastName: {
			type: GraphQLString,
			description: 'The last name of the contact',
		},
		phone: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The phone number of the contact',
		},
		email: {
			type: GraphQLString,
			description: 'The email address of the contact',
		},
	}),
});
