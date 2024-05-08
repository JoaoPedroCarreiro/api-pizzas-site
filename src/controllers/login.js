const JWTService = require("../services/jwt")
const TimeUnits = require("../utils/time-units")
const User = require("../models/user")

async function login(req, res) {
    const user = new User(req.body.username)

    try {
        const id = await user.getId()
        const passwordsMatch = await user.isPassword(req.body.password)
        
        if(!passwordsMatch) throw new Error("Incorrect Password")
        
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
            message: "Error trying to log in account",
            err: err.message
        })
    }
}

module.exports = login