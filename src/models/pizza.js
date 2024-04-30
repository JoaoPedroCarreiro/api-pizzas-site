const Db = require("../services/db")

const { HOST } = require("../utils/url")

class Pizza {
    constructor(id) {
        this.id = id
    }

    static async getTopPizzas(n) {
        return n ?
            (await Db(`SELECT *, CONCAT('${HOST}/assets/pizzas/', img) AS img FROM pizzas ORDER BY rating DESC LIMIT ?`, [n]))[0]
        :
            (await Db(`SELECT *, CONCAT('${HOST}/assets/pizzas/', img) AS img FROM pizzas ORDER BY rating DESC`, [n]))[0]
    }

    async get() {
       return (await Db(`SELECT *, CONCAT('${HOST}/assets/pizzas/', img) AS img FROM pizzas WHERE id = ?`, [this.id]))[0][0]
    }
}

module.exports = Pizza