const router = require("express").Router()

const User = require("../controllers/usr")
const Validate = require("../middleware/validate")
const LimitRate = require("../middleware/limit-rate")
const Session = require("../middleware/session")
const File = require("../middleware/file")

router.get("/:usr", User.usr)
router.get("/:usr/ratings", User.ratings)
router.patch("/:usr/username", Session.isUserInSession, LimitRate.username, Validate.username, User.updateUsername)
router.patch("/:usr/img", Session.isUserInSession, LimitRate.img, File.middleware, User.updateImg)
router.post("/:usr/rating", Session.isUserInSession, LimitRate.rating, User.rate)
router.delete("/:usr", Session.isUserInSession, User.deleteUser)

module.exports = router