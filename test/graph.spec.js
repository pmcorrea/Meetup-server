const { createTestClient } = require("apollo-server-testing");
const knex = require("knex");
const app = require("../src/app");
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../src/schema/apollo");
const service_app = require("../src/service_app");
const test_query = require("../test/test_queries");

describe("Graph Test Suite", () => {
	before("initialize db connection", () => {
		db = knex({
			client: "pg",
			connection: process.env.TEST_DB_URL,
		});
		app.set("db", db);
	});

	after("disconnect db", () => db.destroy());

	afterEach("truncate tables and reset ids", async () => {
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

		await cleanDB(db);
	});

	let user = {
		user_first_name: "Pedro",
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

	let participants = [
		{
			user_id: 1,
			event_id: 1,
			participant_status: "going",
		},
		{
			user_id: 2,
			event_id: 1,
			participant_status: "invited",
		},
		{
			user_id: 2,
			event_id: 2,
			participant_status: "going",
		},
	];

	let followers = [
		{
			user_id: 1,
			following_id: 2,
		},
		{
			user_id: 2,
			following_id: 1,
		},
	];

	let invites = [
		{
			event_id: 1,
			user_id: 1,
			sender_id: 2,
		},
		{
			event_id: 2,
			user_id: 2,
			sender_id: 1,
		},
	];

	let bookmarks = [
		{
			user_id: 1,
			event_id: 2,
		},
		{
			user_id: 2,
			event_id: 1,
		},
	];

	describe("graphql queries", () => {
		it("user query", async () => {
			await service_app.addUser(db, user);
			await service_app.addUser(db, user2);
			await service_app.addEvent(db, events[0]);
			await service_app.addEvent(db, events[1]);
			await service_app.addEvent(db, events[2]);
			await service_app.addFollower(db, followers[0]);
			await service_app.addFollower(db, followers[1]);
			await service_app.addParticipant(db, participants[0]);
			await service_app.addParticipant(db, participants[1]);
			await service_app.addParticipant(db, participants[2]);
			await service_app.addInvite(db, invites[0]);
			await service_app.addInvite(db, invites[1]);
			await service_app.addBookmark(db, bookmarks[0]);
			await service_app.addBookmark(db, bookmarks[1]);

			const server = new ApolloServer({
				typeDefs,
				resolvers,
				context: ({ req }) => ({
					knexInstance: db,
				}),
			});

			const { query } = createTestClient(server);

			let res = await query({
				query: test_query.user,
				variables: { id: 1 },
			});
			res = res["data"]["user"]["user_first_name"];
			expect(res).to.equal("Pedro");
		});

		it("event query", async () => {
			await service_app.addUser(db, user);
			await service_app.addUser(db, user2);
			await service_app.addEvent(db, events[0]);
			await service_app.addEvent(db, events[1]);
			await service_app.addEvent(db, events[2]);
			await service_app.addFollower(db, followers[0]);
			await service_app.addFollower(db, followers[1]);
			await service_app.addParticipant(db, participants[0]);
			await service_app.addParticipant(db, participants[1]);
			await service_app.addParticipant(db, participants[2]);
			await service_app.addInvite(db, invites[0]);
			await service_app.addInvite(db, invites[1]);
			await service_app.addBookmark(db, bookmarks[0]);
			await service_app.addBookmark(db, bookmarks[1]);

			const server = new ApolloServer({
				typeDefs,
				resolvers,
				context: ({ req }) => ({
					knexInstance: db,
				}),
			});

			const { query } = createTestClient(server);

			let res = await query({
				query: test_query.event,
				variables: { id: 1 },
			});

			expect(res["data"]["event"]["id"]).to.equal(1);
		});

		it("participants query", async () => {
			await service_app.addUser(db, user);
			await service_app.addUser(db, user2);
			await service_app.addEvent(db, events[0]);
			await service_app.addEvent(db, events[1]);
			await service_app.addEvent(db, events[2]);
			await service_app.addFollower(db, followers[0]);
			await service_app.addFollower(db, followers[1]);
			await service_app.addParticipant(db, participants[0]);
			await service_app.addParticipant(db, participants[1]);
			await service_app.addParticipant(db, participants[2]);
			await service_app.addInvite(db, invites[0]);
			await service_app.addInvite(db, invites[1]);
			await service_app.addBookmark(db, bookmarks[0]);
			await service_app.addBookmark(db, bookmarks[1]);

			const server = new ApolloServer({
				typeDefs,
				resolvers,
				context: ({ req }) => ({
					knexInstance: db,
				}),
			});

			const { query } = createTestClient(server);

			let res = await query({
				query: test_query.participants,
				variables: { eventId: 1 },
			});

			expect(
				res["data"]["participants"][0]["user"]["user_first_name"]
			).to.equal("Pedro");

			expect(
				res["data"]["participants"][1]["user"]["user_first_name"]
			).to.equal("Peter");

			expect(
				res["data"]["participants"][0]["event"]["event_name"]
			).to.equal("test event 1");
		});

		it("bookmarksByUserId query", async () => {
			await service_app.addUser(db, user);
			await service_app.addUser(db, user2);
			await service_app.addEvent(db, events[0]);
			await service_app.addEvent(db, events[1]);
			await service_app.addEvent(db, events[2]);
			await service_app.addFollower(db, followers[0]);
			await service_app.addFollower(db, followers[1]);
			await service_app.addParticipant(db, participants[0]);
			await service_app.addParticipant(db, participants[1]);
			await service_app.addParticipant(db, participants[2]);
			await service_app.addInvite(db, invites[0]);
			await service_app.addInvite(db, invites[1]);
			await service_app.addBookmark(db, bookmarks[0]);
			await service_app.addBookmark(db, bookmarks[1]);

			const server = new ApolloServer({
				typeDefs,
				resolvers,
				context: ({ req }) => ({
					knexInstance: db,
				}),
			});

			const { query } = createTestClient(server);

			let res = await query({
				query: test_query.bookmarksByUserId,
				variables: { userId: 1 },
			});

			expect(res["data"]["bookmarksByUserId"][0]["user"]["id"]).to.equal(
				1
			);
		});

		it("eventsByHost query", async () => {
			await service_app.addUser(db, user);
			await service_app.addUser(db, user2);
			await service_app.addEvent(db, events[0]);
			await service_app.addEvent(db, events[1]);
			await service_app.addEvent(db, events[2]);
			await service_app.addFollower(db, followers[0]);
			await service_app.addFollower(db, followers[1]);
			await service_app.addParticipant(db, participants[0]);
			await service_app.addParticipant(db, participants[1]);
			await service_app.addParticipant(db, participants[2]);
			await service_app.addInvite(db, invites[0]);
			await service_app.addInvite(db, invites[1]);
			await service_app.addBookmark(db, bookmarks[0]);
			await service_app.addBookmark(db, bookmarks[1]);

			const server = new ApolloServer({
				typeDefs,
				resolvers,
				context: ({ req }) => ({
					knexInstance: db,
				}),
			});

			const { query } = createTestClient(server);

			let res = await query({
				query: test_query.eventsByHost,
				variables: { id: 1 },
			});
			expect(res["data"]["eventsByHost"][0]["event_host_id"]).to.equal(1);
			expect(res["data"]["eventsByHost"][1]["event_host_id"]).to.equal(1);
		});

		it("invitesByUserId query", async () => {
			await service_app.addUser(db, user);
			await service_app.addUser(db, user2);
			await service_app.addEvent(db, events[0]);
			await service_app.addEvent(db, events[1]);
			await service_app.addEvent(db, events[2]);
			await service_app.addFollower(db, followers[0]);
			await service_app.addFollower(db, followers[1]);
			await service_app.addParticipant(db, participants[0]);
			await service_app.addParticipant(db, participants[1]);
			await service_app.addParticipant(db, participants[2]);
			await service_app.addInvite(db, invites[0]);
			await service_app.addInvite(db, invites[1]);
			await service_app.addBookmark(db, bookmarks[0]);
			await service_app.addBookmark(db, bookmarks[1]);

			const server = new ApolloServer({
				typeDefs,
				resolvers,
				context: ({ req }) => ({
					knexInstance: db,
				}),
			});

			const { query } = createTestClient(server);

			let res = await query({
				query: test_query.invitesByUserId,
				variables: { id: 1 },
			});
			expect(res["data"]["invitesByUserId"][0]["user"]["id"]).to.equal(1);
		});

		it("invitesByEventId query", async () => {
			await service_app.addUser(db, user);
			await service_app.addUser(db, user2);
			await service_app.addEvent(db, events[0]);
			await service_app.addEvent(db, events[1]);
			await service_app.addEvent(db, events[2]);
			await service_app.addFollower(db, followers[0]);
			await service_app.addFollower(db, followers[1]);
			await service_app.addParticipant(db, participants[0]);
			await service_app.addParticipant(db, participants[1]);
			await service_app.addParticipant(db, participants[2]);
			await service_app.addInvite(db, invites[0]);
			await service_app.addInvite(db, invites[1]);
			await service_app.addBookmark(db, bookmarks[0]);
			await service_app.addBookmark(db, bookmarks[1]);

			const server = new ApolloServer({
				typeDefs,
				resolvers,
				context: ({ req }) => ({
					knexInstance: db,
				}),
			});

			const { query } = createTestClient(server);

			let res = await query({
				query: test_query.invitesByEventId,
				variables: { id: 1 },
			});
			expect(res["data"]["invitesByEventId"][0]["event"]["id"]).to.equal(
				1
			);
		});
	});
});
