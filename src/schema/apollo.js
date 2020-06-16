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
	type User {
		id: Int!
		user_first_name: String!
		user_last_name: String!
		user_email: String!
		user_password: String!
		user_zipcode: String!
		user_employer: String!
		user_employer_address: String!
		user_no_of_followers: String!
		user_status: String!
		user_avatar: String!
		user_bio: String!
	}

	type Event {
		id: Int!
		event_name: String!
		event_description: String!
		event_location_name: String!
		event_address: String!
		event_date: String!
		event_time: String!
		event_host_id: Int!
		event_no_of_participants: String!
		event_cover_img: String!
	}

	type Participant {
		id: Int!
		user: User!
		event: Event!
		participant_status: String!
	}

	type Follower {
		id: Int!
		user: User!
		follower: User!
	}

	type Invite {
		id: Int!
		event: Event!
		user: User!
		sender: User!
	}

	type Bookmark {
		id: Int!
		user: User!
		event: Event!
	}

	type Query {
		users: [User!]!
		user(id: Int!): User

		events: [Event!]!
		event(id: Int!): Event
		eventsByHost(id: Int!): [Event!]!

		participants(eventId: Int!): [Participant!]!

		invites: [Invite!]!
		invitesByUserId(userId: Int!): [Invite!]!
		invitesByEventId(eventId: Int!): [Invite!]!

		bookmarksByUserId(userId: Int!): [Bookmark!]!
	}
`;

const resolvers = {
	Query: {
		user: async (parent, args, context) => {
			let result = await service_app.getUserById(
				context.knexInstance,
				args.id
			);

			return result[0];
		},

		users: async (parent, args, context) => {
			let result = await service_app.getAllUsers(context.knexInstance);
			return result;
		},

		events: async (parent, args, context) => {
			let result = await service_app.getAllEvents(context.knexInstance);
			return result;
		},

		event: async (parent, args, context) => {
			let result = await service_app.getEventById(
				context.knexInstance,
				args.id
			);
			return result[0];
		},

		eventsByHost: async (parent, args, context) => {
			let result = await service_app.getEventsByHostId(
				context.knexInstance,
				args.id
			);
			return result;
		},

		participants: async (parent, args, context) => {
			let result = await service_app.getParticipants(
				context.knexInstance,
				args.eventId
			);
			return result;
		},

		invites: async (parent, args, context) => {
			let result = await service_app.getAllInvites(context.knexInstance);
			return result;
		},

		invitesByUserId: async (parent, args, context) => {
			let result = await service_app.getInvitesByUserId(
				context.knexInstance,
				args.userId
			);
			return result;
		},

		invitesByEventId: async (parent, args, context) => {
			let result = await service_app.getInvitesByEventId(
				context.knexInstance,
				args.eventId
			);
			return result;
		},

		bookmarksByUserId: async (parent, args, context) => {
			let result = await service_app.getBookmarksByUserId(
				context.knexInstance,
				args.userId
			);
			return result;
		},
	},

	Participant: {
		user: async (parent, args, context) => {
			let result = await service_app.getUserById(
				context.knexInstance,
				parent.user_id
			);

			return result[0];
		},

		event: async (parent, args, context) => {
			let result = await service_app.getEventById(
				context.knexInstance,
				parent.event
			);
			return result[0];
		},
	},

	Follower: {
		user: async (parent, args, context) => {
			let result = await service_app.getUserById(
				context.knexInstance,
				parent.user_id
			);

			return result[0];
		},

		follower: async (parent, args, context) => {
			let result = await service_app.getUserById(
				context.knexInstance,
				parent.following_id
			);
			return result[0];
		},
	},

	Invite: {
		event: async (parent, args, context) => {
			let result = await service_app.getEventById(
				context.knexInstance,
				parent.event_id
			);

			return result[0];
		},

		user: async (parent, args, context) => {
			let result = await service_app.getUserById(
				context.knexInstance,
				parent.user_id
			);
			return result[0];
		},

		sender: async (parent, args, context) => {
			let result = await service_app.getUserById(
				context.knexInstance,
				parent.sender_id
			);
			return result[0];
		},
	},

	Bookmark: {
		event: async (parent, args, context) => {
			let result = await service_app.getEventById(
				context.knexInstance,
				parent.event_id
			);

			return result[0];
		},

		user: async (parent, args, context) => {
			let result = await service_app.getUserById(
				context.knexInstance,
				parent.user_id
			);
			return result[0];
		},
	},
};

module.exports = {
	typeDefs,
	resolvers,
};
