const JWTService = require("../services/jwt")

function validate(req, res, next) {
    try {
        if(!req.body.token) throw new Error("Empty token")
        JWTService.verify(req.body.token)
    } catch (err) {
        res.status(401).send({
            message: "Invalid token",
            err: err.message
        })

        return
    }

    next()
}

function isUserInSession(req, res, next) {
    try {
        if(!req.body.token && !req.query.token) throw new Error("Empty token")
        if(Number(req.params.usr) !== JWTService.verify(req.body.token ? req.body.token : req.query.token).id) throw new Error("Unauthorized token")
    } catch (err) {
        res.status(401).send({
            message: "You don't have permission to do this",
            err: err.message
        })

        return
    }

    next()
}

module.exports = {
    validate,
    isUserInSession
}