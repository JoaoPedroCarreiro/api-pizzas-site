const Account = require("../models/account")

const message = "Error with request to server, try changing the fields"
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g;

const sendErr = (res, msg) => res.status(400).send({ message: message, err: msg })

async function signup(req, res, next) {
    const account = new Account(req.body.email, req.body.username, req.body.password)

    try {
        if(!account.email) { sendErr(res, "Empty email"); return }
        if(!account.email.toLowerCase().match(emailRegex)) { sendErr(res, "Email invalid"); return }
        if(!(await account.emailAvailable())) { sendErr(res, "Email is already registered"); return }

        if(!account.username) { sendErr(res, "Empty username"); return }
        if(!(await account.usernameAvailable())) { sendErr(res, "Username is already taken"); return }
    
        if(!account.password) { sendErr(res, "Empty password"); return }
        if(account.password.length < 8) { sendErr(res, "Too short password"); return }
        if(account.password.length > 72) { sendErr(res, "Too big password"); return }        
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

    next()
}

function login(req, res, next) {
    const account = new Account(undefined, req.body.username, req.body.password)

    if(!account.username) { sendErr(res, "Empty username"); return }
    if(!account.password) { sendErr(res, "Empty password"); return }

    next()
}

async function username(req, res, next) {
    const account = new Account(undefined, req.body.newUsername, undefined)

    try {
        if(!account.username) { sendErr(res, "Empty username"); return }
        if(!(await account.usernameAvailable())) { sendErr(res, "Username is already taken"); return }
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

    next()
}

module.exports = {
    signup,
    login,
    username
}