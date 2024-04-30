const JWTService = require("../services/jwt")

async function user(req, res) {
    const { id } = JWTService.verify(req.cookies.token)
    res.status(200).send({ id })
}

module.exports = user