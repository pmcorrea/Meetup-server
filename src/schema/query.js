const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean,
} = require("graphql");

require("dotenv").config();
const knex = require("knex");
const _ = require("lodash");
const service_app = require("../service_app");
const service_auth = require("../service_auth");

//Custom types
const { BookType } = require("./types.js");

// Dummy data
let books = [
	{ name: "Book1", genre: "action", id: 1 },
	{ name: "Book2", genre: "drama", id: 2 },
	{ name: "Book3", genre: "self-help", id: 3 },
];

// Database
const knexInstance = knex({
	client: "pg",
	connection: process.env.DATABASE_URL,
});

//Define the root queries
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		someQuery: {
			type: BookType,
			args: {
				id: { type: GraphQLInt },
			},
			resolve(parent, args) {
				return;
			},
		},
	},
});

//Define mutations
const RootMutation = new GraphQLObjectType({
	name: "RootMutation",
	fields: {
		// Add a habit
		addHabit: {
			type: HabitType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parents, args, context) {
				return;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});
