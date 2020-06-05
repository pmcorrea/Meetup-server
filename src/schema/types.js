const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} = require("graphql");

// Define Movie Type
const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	}),
});

module.exports = {
	BookType: BookType,
};
