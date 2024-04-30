const User = require("../models/user")

async function usr(req, res) {
    const user = new User(Number(req.params.usr))

    try {
        const info  = await user.getInfo()

        res.status(200).send(info)
    } catch (err) {
        if(err.message === "Internal Error") {
            res.status(500).send({
                message: "Error connecting with database, try again later",
                err: err.message
            })
            
            return
        }

        res.status(404).send({
            message: "Error trying to get information of user",
            err: err.message
        })
    }
}

async function updateUsername(req, res) {
    const user = new User(Number(req.params.usr))

    try {
        await user.updateName(req.body.newUsername)
        res.status(200).send("Success")
    } catch (err) {
        if(err.message === "Internal Error") {
            res.status(500).send({
                message: "Error connecting with database, try again later",
                err: err.message
            })
            
            return
        }

        res.status(404).send({
            message: "Error trying to change username",
            err: err.message
        })
    }
}

async function updateImg(req, res) {
    const user = new User(Number(req.params.usr))

    try {
        await user.updateImg(req.file.filename)
        res.status(200).send("Success")
    } catch (err) {
        if(err.message === "Internal Error") {
            res.status(500).send({
                message: "Error connecting with database, try again later",
                err: err.message
            })
            
            return
        }

        res.status(404).send({
            message: "Error trying to change profile picture",
            err: err.message
        })
    }
}

async function rate(req, res) {
    const user = new User(Number(req.params.usr))

    try {
        user.rate(req.body.pizza, req.body.rating)
        res.status(201).send("Success")
    } catch (err) {
        if(err.message === "Internal Error") {
            res.status(500).send({
                message: "Error connecting with database, try again later",
                err: err.message
            })
            
            return
        }

        res.status(404).send({
            message: "Error trying to rate a pizza",
            err: err.message
        })
    }
}

async function ratings(req, res) {
    const user = new User(Number(req.params.usr))

    try {
        const ratings = await user.getRatings()
        res.status(200).send(ratings)
    } catch (err) {
        if(err.message === "Internal Error") {
            res.status(500).send({
                message: "Error connecting with database, try again later",
                err: err.message
            })
            
            return
        }

        res.status(404).send({
            message: "Error trying to get ratings",
            err: err.message
        })
    }
}

async function deleteUser(req, res) {
    const user = new User(Number(req.params.usr))

    try {
        await user.deleteUser()
        res.status(200).send("Success")
    } catch (err) {
        if(err.message === "Internal Error") {
            res.status(500).send({
                message: "Error connecting with database, try again later",
                err: err.message
            })
            
            return
        }

        res.status(404).send({
            message: "Error trying to get ratings",
            err: err.message
        })
    }
}

module.exports = { usr, updateUsername, updateImg, rate, ratings, deleteUser }