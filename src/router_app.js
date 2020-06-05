const express = require("express")
const router_app = express.Router()
const jsonParser = express.json()

const service_auth = require("./service_auth");
const service_app = require("./service_app")
const { requireAuth } = require("./jwt-auth")
const xss = require("xss");


router_app
	.route("/")
	.all(requireAuth)
	.post(jsonParser, (req, res, next) => {
		
	})

module.exports = router_app;