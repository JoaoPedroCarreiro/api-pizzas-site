const router = require("express").Router()

const Session = require("../middleware/session")
const user = require("../controllers/user")

router.get("/", Session.validate, user)

module.exports = router