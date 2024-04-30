const router = require("express").Router()

const login = require("../controllers/login")
const Validate = require("../middleware/validate")
const LimitRate = require("../middleware/limit-rate")

router.use(LimitRate.login)
router.use(Validate.login)
router.post("/", login)

module.exports = router