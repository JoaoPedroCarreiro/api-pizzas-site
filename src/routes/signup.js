const router = require("express").Router()

const signup = require("../controllers/signup")
const Validate = require("../middleware/validate")
const LimitRate = require("../middleware/limit-rate")

router.use(LimitRate.signup)
router.use(Validate.signup)
router.post("/", signup)

module.exports = router