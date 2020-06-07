const service_app = {
	getAllInvites(knex) {
		console.log("fired knex");
		console.log(knex.select("*").from("invites"));
		return knex.select("*").from("invites");
	},
};

module.exports = service_app;
