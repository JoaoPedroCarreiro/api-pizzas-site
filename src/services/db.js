require("dotenv").config()
const mysql = require("mysql2/promise")
const DbConfig = require("../config/db")

let conn = null

async function Db(query, values) {
    if(!conn) {
        try {
            conn = await mysql.createConnection(DbConfig)
        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    await conn.connect()
    const res = await conn.query(query, values)
    await conn.end()
    
    return res
}

module.exports = Db