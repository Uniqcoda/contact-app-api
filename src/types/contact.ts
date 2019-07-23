import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

const ContactType = new GraphQLObjectType({
	name: 'Contact',
	description: 'Information about a single contact',
	fields: () => ({
		id: {
			type: GraphQLString,
			description: 'The ID of the contact',
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

export default ContactType;
