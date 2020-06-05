// Respect env variables and establish defaults
module.exports = {
	PORT: process.env.PORT || 5000,
	NODE_ENV: process.env.NODE_ENV || "development",
	DATABASE_URL:
		process.env.DATABASE_URL || "postgresql://postgres@localhost/project",
	TEST_DB_URL:
		process.env.TEST_DB_URL ||
		"postgresql://postgres@localhost/project_test",
	JWT_SECRET: process.env.JWT_SECRET || "secret123",
	CLIENT_ENDPOINT: process.env.CLIENT_ENDPOINT || "https://project.now.sh",
	// CLIENT_ENDPOINT: "http://localhost:3000",
};
