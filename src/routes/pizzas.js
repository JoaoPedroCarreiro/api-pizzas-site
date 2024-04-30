const router = require("express").Router()

const { pizzas, pizza } = require("../controllers/pizzas")

router.get("/", pizzas)
router.get("/:pizza", pizza)

module.exports = router