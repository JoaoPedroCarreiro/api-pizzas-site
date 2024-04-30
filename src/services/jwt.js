require("dotenv").config()
const jwt = require("jsonwebtoken")

function sign(data) {
    return jwt.sign(data, process.env.SECRET, { algorithm: "HS512" })
}

function verify(token) {
    try {
        return jwt.verify(token, process.env.SECRET, { algorithm: "HS512" })
    } catch (err) {
        throw new Error("Invalid Token")
    }
}

module.exports = {
    sign,
    verify
}