require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")

const { ORIGIN, HOST } = require("./src/utils/url")

const signup = require("./src/routes/signup")
const login = require("./src/routes/login")
const user = require("./src/routes/user")
const pizzas = require("./src/routes/pizzas")
const usr = require("./src/routes/usr")

const app = express()

app.use(bodyParser.json({ limit: "5mb" }))
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }))
app.use(cookieParser())
app.use(cors({ origin: ORIGIN, credentials: true }))

app.use("/", express.static("public"))

app.use("/signup", signup)
app.use("/login", login)

app.use("/pizzas", pizzas)
app.use("/usr", usr)

app.use("/", user)

app.listen(process.env.PORT, () => { console.log(`[index.js] App on ${HOST}`) })