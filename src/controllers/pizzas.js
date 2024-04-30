const Pizza = require("../models/pizza")

async function pizzas(req, res) {
    try {
        const pizzas = await Pizza.getTopPizzas(req.query.amount ? Number(req.query.amount) : undefined)
        res.status(200).send(pizzas)
    } catch (err) {
        if(err.message === "Internal Error") {
            res.status(500).send({
                message: "Error connecting with database, try again later",
                err: err.message
            })
            
            return
        }

        res.status(404).send({
            message: "Error getting the pizzas",
            err: err.message
        })
    }
}

async function pizza(req, res) {
    const pizza = new Pizza(Number(req.params.pizza))

    try {
        const response = await pizza.get()
        res.status(200).send(response)
    } catch (err) {
        if(err.message === "Internal Error") {
            res.status(500).send({
                message: "Error connecting with database, try again later",
                err: err.message
            })
            
            return
        }

        res.status(404).send({
            message: "Error getting pizza",
            err: err.message
        })
    }
}

module.exports = {
    pizzas,
    pizza
}