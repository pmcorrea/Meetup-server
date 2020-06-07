require("dotenv").config();
const {
	PORT,
	DATABASE_HOST,
	DATABASE_USER,
	DATABASE_PASSWORD,
	DATABASE_DATABASE,
} = require("./config");
const app = require("./app");
const knex = require("knex");

const knexInstance = knex({
	client: "pg",
	// connection: process.env.DATABASE_URL,
	connection: {
		host: DATABASE_HOST,
		user: DATABASE_USER,
		password: DATABASE_PASSWORD,
		database: DATABASE_DATABASE,
	},
});

// Avoid dependency cycle
app.set("db", knexInstance);

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
