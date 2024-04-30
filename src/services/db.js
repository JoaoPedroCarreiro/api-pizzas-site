require("dotenv").config()
const mysql = require("mysql2/promise")
const DbConfig = require("../config/db")

let conn = null

async function Db(query, values) {
    try {
        conn = await mysql.createConnection(DbConfig)
        await conn.connect()
    } catch (err) {
        throw new Error("Internal Error")
    }
    
    const res = await conn.query(query, values)
    await conn.end()
    
    return res
}

module.exports = Db