const JWTService = require("../services/jwt")
const TimeUnits = require("../utils/time-units")
const Account = require("../models/account")
const User = require("../models/user")

async function signup(req, res) {
    const account = new Account(req.body.email, req.body.username, req.body.password)
    const user = new User(req.body.username)

    try {
        await account.post()

        const id = await user.getId()

        const token = JWTService.sign(id)
        const cookie = `__token=${token}; SameSite=None; Secure; Max-Age=${TimeUnits.yearToSec(10)}`
        
        res.status(200).send(token)
    } catch (err) {
        if(err.message === "Internal Error") {
            res.status(500).send({
                message: "Error connecting with database, try again later",
                err: err.message
            })
            
            return
        }

        res.status(404).send({
            message: "Error trying to create account",
            err: err.message
        })
    }
}

module.exports = signup