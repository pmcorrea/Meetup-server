// Ensure tests are properly working
const app = require("../src/app")
const knex = require("knex")
const helpers = require("./test_helpers")
const jwt = require("jsonwebtoken")

describe("App", () => {
  it("GET / responds with 200 containing 'Hello, world!'", () => {
    return supertest(app)
      .get("/")
      .expect(200, "Hello, world!")
  })
})