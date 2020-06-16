const service_app = {
	// User Methods
	getAllUsers(knex) {
		return knex.select("*").from("users");
	},

	getUserById(knex, userId) {
		return knex.select("*").from("users").where("id", userId);
	},

	addUser(knex, user) {
		return knex.returning("*").insert(user).into("users");
	},

	deleteUser(knex, userId) {
		return knex("users").where("id", userId).del();
	},

	updateUser(knex, user, userId) {
		return knex("users").update(user).where("id", userId);
	},

	// Event Methods
	getAllEvents(knex) {
		return knex.select("*").from("events");
	},

	getEventById(knex, eventId) {
		return knex.select("*").from("events").where("id", eventId);
	},

	getEventsByHostId(knex, hostId) {
		return knex.select("*").from("events").where("event_host_id", hostId);
	},

	addEvent(knex, event) {
		return knex.insert(event).into("events");
	},

	deleteEvent(knex, eventId) {
		return knex("events").where("id", eventId).del();
	},

	updateEvent(knex, event, eventId) {
		return knex("events").update(event).where("id", eventId);
	},

	// Participant Methods
	getParticipants(knex, eventId) {
		return knex.select("*").from("participants").where("event_id", eventId);
	},

	addParticipant(knex, participant) {
		return knex.insert(participant).into("participants").returning("*");
	},

	deleteParticipant(knex, participantId) {
		return knex("participants").where("id", participantId).del();
	},

	updateParticipant(knex, participant, participantId) {
		return knex("participants")
			.update({
				user_id: participant.user_id,
				event_id: participant.event_id,
				participant_status: participant.participant_status,
			})
			.where("id", participantId);
	},

	// Follower Methods
	getFollowById(knex, id) {
		return knex.select("*").from("followers").where("id", id);
	},

	getFollowers(knex, id) {
		return knex.select("*").from("followers").where("following_id", id);
	},

	getFollowing(knex, userId) {
		return knex.select("*").from("followers").where("user_id", userId);
	},

	addFollower(knex, follower) {
		return knex("followers").insert(follower).returning("*");
	},

	deleteFollower(knex, followerId) {
		return knex("followers").where("id", followerId).del();
	},

	// Invite Methods
	getAllInvites(knex) {
		return knex.select("*").from("invites");
	},

	getInviteById(knex, id) {
		return knex.select("*").from("invites").where("id", id);
	},

	getInvitesByUserId(knex, userId) {
		return knex.select("*").from("invites").where("user_id", userId);
	},

	getInvitesByEventId(knex, eventId) {
		return knex.select("*").from("invites").where("event_id", eventId);
	},

	addInvite(knex, invite) {
		return knex("invites").insert(invite).returning("*");
	},

	deleteInvite(knex, inviteId) {
		return knex("invites").where("id", inviteId).del();
	},

	// Bookmark Methods
	getBookmarksByUserId(knex, userId) {
		return knex.select("*").from("bookmarks").where("user_id", userId);
	},

	getBookmarksById(knex, id) {
		return knex.select("*").from("bookmarks").where("id", id);
	},

	addBookmark(knex, bookmark) {
		return knex("bookmarks").insert(bookmark).returning("*");
	},

	deleteBookmark(knex, bookmarkId) {
		return knex("bookmarks").where("id", bookmarkId).del();
	},
};

module.exports = service_app;
