const rateLimit = require("express-rate-limit")
const LimitConfig = require("../config/limit-rate")

const signup = rateLimit(LimitConfig.signup)
const login = rateLimit(LimitConfig.login)
const username = rateLimit(LimitConfig.username)
const img = rateLimit(LimitConfig.img)
const rating = rateLimit(LimitConfig.rating)

module.exports = {
    signup,
    login,
    username,
    img,
    rating
}