// Ensure tests are properly working
const app = require("../src/app");
const knex = require("knex");
const helpers = require("./test_helpers");
const jwt = require("jsonwebtoken");
const service_app = require("../src/service_app");

// describe("App", () => {
// 	it("GET / responds with 200 containing 'Hello, world!'", () => {
// 		return supertest(app).get("/").expect(200, "Hello, world!");
// 	});
//

describe("DB Test Suite", () => {
	before("initialize db connection", () => {
		db = knex({
			client: "pg",
			connection: process.env.TEST_DB_URL,
		});
		app.set("db", db);
	});

	after("disconnect db", () => db.destroy());

	afterEach("truncate tables and reset ids", () => {
		function cleanDB(db) {
			return db.transaction((trx) =>
				trx
					.raw(
						`TRUNCATE
						bookmarks,
						events,
						followers,
						invites,
						participants,
						users
						`
					)
					.then(() =>
						Promise.all([
							trx.raw(
								`ALTER SEQUENCE bookmarks_id_seq minvalue 0 START WITH 1`
							),
							trx.raw(
								`ALTER SEQUENCE events_id_seq minvalue 0 START WITH 1`
							),
							trx.raw(
								`ALTER SEQUENCE followers_id_seq minvalue 0 START WITH 1`
							),
							trx.raw(
								`ALTER SEQUENCE invites_id_seq minvalue 0 START WITH 1`
							),
							trx.raw(
								`ALTER SEQUENCE participants_id_seq minvalue 0 START WITH 1`
							),
							trx.raw(
								`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`
							),
							trx.raw(`SELECT setval('bookmarks_id_seq', 0)`),
							trx.raw(`SELECT setval('events_id_seq', 0)`),
							trx.raw(`SELECT setval('followers_id_seq', 0)`),
							trx.raw(`SELECT setval('invites_id_seq', 0)`),
							trx.raw(`SELECT setval('participants_id_seq', 0)`),
							trx.raw(`SELECT setval('users_id_seq', 0)`),
						])
					)
					.catch(function (error) {
						console.error("clean err", error);
					})
			);
		}

		cleanDB(db);
	});

	let user = {
		user_first_name: "Peter",
		user_last_name: "Correa",
		user_email: "blah@me.com",
		user_password:
			"$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y",
		user_zipcode: "33014",
		user_employer: "Magic Inc.",
		user_employer_address: "123 Main St.",
		user_no_of_followers: "22",
		user_status: "admin",
		user_avatar:
			"https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg",
		user_bio: "Some bio.",
	};

	let user2 = {
		user_first_name: "Peter",
		user_last_name: "Correa",
		user_email: "blah2@me.com",
		user_password:
			"$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y",
		user_zipcode: "33014",
		user_employer: "Magic Inc.",
		user_employer_address: "123 Main St.",
		user_no_of_followers: "22",
		user_status: "admin",
		user_avatar:
			"https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg",
		user_bio: "Some bio.",
	};

	let events = [
		{
			event_name: "test event 1",
			event_description: "test event description",
			event_location_name: "test event location",
			event_address: "123 Main St.",
			event_date: "01/01/1990",
			event_time: "5:00pm",
			event_host_id: "1",
			event_no_of_participants: "2",
			event_cover_img:
				"https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg",
		},
		{
			event_name: "test event 2",
			event_description: "test event description",
			event_location_name: "test event location",
			event_address: "123 Main St.",
			event_date: "01/01/1990",
			event_time: "5:00pm",
			event_host_id: "1",
			event_no_of_participants: "3",
			event_cover_img:
				"https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg",
		},
		{
			event_name: "test event 3",
			event_description: "test event description",
			event_location_name: "test event location",
			event_address: "123 Main St.",
			event_date: "01/01/1990",
			event_time: "5:00pm",
			event_host_id: "2",
			event_no_of_participants: "2",
			event_cover_img:
				"https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg",
		},
	];

	describe("user methods", () => {
		it("Should add a user", async () => {
			let result = await service_app.addUser(db, user);
			let final_result = result[0];
			expect(final_result["user_first_name"]).to.equal("Peter");
		});

		it("Should retrieve a user", async () => {
			await service_app.addUser(db, user);
			let result = await service_app.getUserById(db, "1");
			expect(result[0]["user_first_name"]).to.equal("Peter");
		});

		it("Should delete a user", async () => {
			await service_app.addUser(db, user);
			let result = await service_app.deleteUser(db, "1");
			expect(result).to.equal(1);
		});

		it("Should update a user", async () => {
			await service_app.addUser(db, user);

			let updatedUser = {
				user_first_name: "Sam",
			};

			await service_app.updateUser(db, updatedUser, "1");
			let result = await service_app.getUserById(db, "1");
			expect(result[0]["user_first_name"]).to.equal("Sam");
		});
	});

	describe("event methods", () => {
		it("Should add an event", async () => {
			await service_app.addUser(db, user);
			await service_app.addUser(db, user2);
			events.forEach(async (event) => {
				await service_app.addEvent(db, event);
			});

			let result1 = await service_app.getEventById(db, 1);
			result1 = result1[0];
			let result2 = await service_app.getEventById(db, 2);
			result2 = result2[0];
			expect(result1["event_name"]).to.equal("test event 1");
			expect(result2["event_name"]).to.equal("test event 2");
		});

		it("Should retrieve an event by id", async () => {
			await Promise.all([
				service_app.addUser(db, user),
				service_app.addUser(db, user2),
			]);

			await Promise.all([
				service_app.addEvent(db, events[0]),
				service_app.addEvent(db, events[1]),
				service_app.addEvent(db, events[2]),
			]);

			let result1 = await service_app.getEventById(db, "1");
			let result2 = await service_app.getEventById(db, "2");
			result1 = result1[0];
			result2 = result2[0];
			expect(result1["id"]).to.equal(1);
			expect(result2["id"]).to.equal(2);
		});

		it("Should retrieve an event by host", async () => {
			await Promise.all([
				service_app.addUser(db, user),
				service_app.addUser(db, user2),
			]);

			await Promise.all([
				service_app.addEvent(db, events[0]),
				service_app.addEvent(db, events[1]),
				service_app.addEvent(db, events[2]),
			]);

			let result = await service_app.getEventsByHostId(db, "1");
			expect(result).to.be.length(2);
		});

		it("Should delete an event", async () => {
			await Promise.all([
				service_app.addUser(db, user),
				service_app.addUser(db, user2),
			]);

			await Promise.all([
				service_app.addEvent(db, events[0]),
				service_app.addEvent(db, events[1]),
				service_app.addEvent(db, events[2]),
			]);

			let result = await service_app.deleteEvent(db, "1");
			let result1 = await service_app.getEventById(db, "1");

			expect(result1).to.have.length(0);
		});

		it("Should update an event", async () => {
			await Promise.all([
				service_app.addUser(db, user),
				service_app.addUser(db, user2),
			]);

			await Promise.all([
				service_app.addEvent(db, events[0]),
				service_app.addEvent(db, events[1]),
				service_app.addEvent(db, events[2]),
			]);

			let updatedEvent = {
				event_name: "updated event name",
			};

			await service_app.updateEvent(db, updatedEvent, "1");

			let result = await service_app.getEventById(db, "1");
			expect(result[0]["event_name"]).to.equal("updated event name");
		});
	});
});
