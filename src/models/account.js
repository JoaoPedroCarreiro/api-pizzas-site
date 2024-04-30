const BCryptService = require("../services/bcrypt")
const Db = require("../services/db")

class Account {
    constructor(email, username, password) {
        this.email = email
        this.username = username
        this.password = password
    }

    async emailAvailable() {
        return (await Db("SELECT * FROM users WHERE email = ?", [this.email]))[0].length === 0
    }

    async usernameAvailable() {
        return (await Db("SELECT * FROM users WHERE username = ?", [this.username]))[0].length === 0
    }

    async post() {
        const bcrypt = new BCryptService(this.password)
        await bcrypt.hash()    
        await Db("INSERT INTO users (email, username, pass) VALUES (?, ?, ?);", [this.email, this.username, bcrypt.hashStr])
    }
}

module.exports = Account