const service_app = {

	getUserIdByUsername(knex, username) {
		return knex
		.select("id")
		.from("users")
		.where("user_name", username)
	},
};

module.exports = service_app;
