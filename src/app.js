// Import Environment Variables
require("dotenv").config();
const { NODE_ENV } = require("./config");

// Import Modules
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

// Instantiate Express App
const app = express();
const router_app = require("./router_app");
const router_auth = require("./router_auth");

// Instantiate Apollo GraphQL Server
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema/apollo.js");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const token = req.headers.authorization || "";

		return {
			knexInstance: app.get("db"),
			token: token,
		};
	},
});

server.applyMiddleware({ app, path: "/graphql" });

// const graphqlHTTP = require('express-graphql');
// const RootQuery = require("./schema/query.js");

// Setup Middleware
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use("/", router_app);
app.use("/api/auth", router_auth);

// app.use("/graphql", graphqlHTTP({
//   schema: RootQuery,
//   graphiql: true,
// }));
// Our production applications should hide error messages from users and other malicious parties
app.use(function errorHandler(error, req, res, next) {
	let response;
	if (NODE_ENV === "production") {
		response = { error: { message: "server error" } };
	} else {
		console.error(error);
		response = { message: error.message, error };
	}
	res.status(500).json(response);
});

// Routes
app.get("/", (req, res) => {
	res.send("Hello, world!");
});

// Export app
module.exports = app;
