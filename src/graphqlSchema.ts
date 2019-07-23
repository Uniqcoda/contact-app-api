import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';
import {getContacts, getBlockedContacts, getContact} from './controllers/index'
import ContactType from './types/contact';

const query = new GraphQLObjectType ({
  name: 'Query',
  description: 'The query root of Contactica App.',
  fields: () => ({
    contacts: {
      type: new GraphQLList(ContactType),
      description: 'All the unblocked contacts',
      resolve: () => getContacts(),
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
        contactId: {
          type: GraphQLString,
          description: 'The ID of the contact to fetch',
        },
      },
      resolve: (_, { contactId }) => {
        return getContact(contactId);
      }
    }
  }
  )
})

const schema = new GraphQLSchema({
  query,
});

export default schema;