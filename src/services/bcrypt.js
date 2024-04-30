const bcrypt = require("bcrypt")

class BCryptService {
    constructor(str) {
        this.str = str
        this.hashStr = ""
    }

    async hash() {
        const max = 16
        const min = 12
        const salt = Math.floor(Math.random() * (max - min) + min)
    
        this.hashStr = await bcrypt.hash(this.str, salt)
    } 

    async compare(hash) {
        return await bcrypt.compare(this.str, hash)
    }
}

module.exports = BCryptService