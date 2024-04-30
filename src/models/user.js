const fs = require("node:fs/promises")
const path = require("path")

const BCryptService = require("../services/bcrypt")
const Db = require("../services/db")

const { HOST } = require("../utils/url")

class User {
    constructor(usernameOrId) {
        this.username = typeof usernameOrId === "string" ? usernameOrId : undefined
        this.id = typeof usernameOrId === "number" ? usernameOrId : undefined
    }

    async isPassword(password) {
        const user = (await Db("SELECT pass FROM users WHERE username=?", [this.username]))[0][0]
        if(!user) throw new Error("User doesn't exists")

        const bcrypt = new BCryptService(password)
        return await bcrypt.compare(user.pass)
    }

    async getId() {
        return (await Db(`SELECT id FROM users WHERE username=?`, [this.username]))[0][0]
    }

    async getInfo(use="id") {
        if(!(use === "username" || use === "id")) throw new Error("Database must use username or id")

        return (await Db(
            `SELECT id, username, CONCAT('${HOST}/assets/users/', img) AS img FROM users WHERE ${use}=?`
            , [this[use]]))[0][0]
    }

    async isAdmin() {
        return (await Db("SELECT is_admin FROM users WHERE username=?", [this.username]))[0][0].is_admin
    }

    async updateName(newName) {
        await Db("UPDATE users SET username = ? WHERE id=?", [newName, this.id])
    }

    async updateImg(newImg) {
        await Db("UPDATE users SET img = ? WHERE id=?", [newImg, this.id])
    }

    async rate(pizza, rating) {
        const id = this.id ? this.id : this.getId()
        await Db("INSERT INTO ratings(id_user, id_pizza, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?", [id, pizza, rating, rating])
    }

    async getRatings() {
        const id = this.id ? this.id : this.getId()

        const query = `
            SELECT r.id_pizza, p.topping, p.price, p.ingredients, p.img, p.pizza_rating, r.rating FROM
            (SELECT * FROM ratings WHERE id_user = ?) AS r INNER JOIN
            (SELECT id AS id_pizza, topping, price, ingredients, CONCAT('${HOST}/assets/pizzas/', img) AS img, rating AS pizza_rating FROM pizzas) AS p
            ON r.id_pizza = p.id_pizza
        `

        return (await Db(query, [id]))[0]
    }

    async deleteUser() {
        try {
            await fs.unlink(path.resolve(`public/assets/users/usr-img-${this.id}.jpg`))
        } catch (err) {
            if(!err.message.includes("no such file or directory")) throw err
        }

        await Db("DELETE FROM users WHERE id=?", this.id)
    }
}

module.exports = User