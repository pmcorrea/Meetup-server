const { gql } = require("apollo-server-express");
const service_app = require("../service_app");

// Scalar Types: Int, Float, String, Boolean, ID
// Object Types: collections of fields which are scalar or object type
// Query Type: defines all of the top-level entry points for (read operations) queries that clients execute against your data graph. Each field represents the name and return type of a different entry point
// Mutation Type: write operations
// Input Types: objects passed as arguments to queries and mutations

// TIPS:
// In GraphQL, it's recommended for every mutation's response to include the data that the mutation modified. This enables clients to obtain the latest persisted data without needing to send a followup query.

// To Do:
// - Custom Scalars
// - Union and Interface Types
// - schema directives
// - using data sources
//  - Apollo federation
// - Caching

const typeDefs = gql`
	type Book {
		id: Int!
		author: String!
		title: String!
	}

	type Invite {
		id: Int!
		event_id: Int!
		user_id: Int!
		sender_id: Int!
	}

	type Query {
		books: [Book!]!
		book(id: Int!): Book
		invites: [Invite!]!
	}

	type Mutation {
		addBook(id: Int!, title: String!, author: String!): [Book!]!
	}
`;

const resolvers = {
	Query: {
		books: () => {
			return books_lib;
		},

		book: (parent, args) => {
			return books_lib.find((book) => book.id === args.id);
		},

		invites: async (parent, args, context) => {
			console.log("start");
			let result = await service_app.getAllInvites(context.knexInstance);
			console.log(result);
			console.log("done");
			return result;
		},
	},

	Mutation: {
		addBook: (parent, args) => {
			books_lib.push({
				id: args.id,
				author: args.author,
				title: args.title,
			});

			return books_lib;
		},
	},
};

module.exports = {
	typeDefs,
	resolvers,
};
