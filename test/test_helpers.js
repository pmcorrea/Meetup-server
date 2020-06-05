const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

function cleanDB(db) {
	return db.transaction(trx =>
		trx.raw(
			`TRUNCATE
			posts, 
			folders,
			users,
			connections
			`
		)
			.then(() =>
				Promise.all([
					trx.raw(`ALTER SEQUENCE folders_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE posts_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
					trx.raw(`SELECT setval("folders_id_seq", 0)`),
					trx.raw(`SELECT setval("posts_id_seq", 0)`),
					trx.raw(`SELECT setval("users_id_seq", 0)`),
				])
			)
			.catch(function (error) {
				console.error(error)
			})
	)
}

function seedUsers(db, users) {
	const preppedUsers = users.map(user => ({
		...user,
		user_password: bcrypt.hashSync(user.user_password, 4)
	}))


	return db.into("users").insert(preppedUsers)
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
	const token = jwt.sign({ user_name: user.user_name }, secret, {
		subject: user.user_name,
		algorithm: "HS256",
	})
	return `Bearer ${token}`
}

module.exports = {
	// makeTestUsers,
	cleanDB,
	seedUsers,
	makeAuthHeader
}