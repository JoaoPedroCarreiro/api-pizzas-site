const multer = require("multer")

const path = require("path")
const Bytes = require("../utils/bytes")

const storage = multer.diskStorage({
    destination: (_, __, callback) => { callback(null, path.resolve("public/assets/users/")) },
    filename: (req, file, callback) => { callback(null, `usr-img-${req.params.usr}${path.extname(file.originalname)}`) }
})

const MulterService = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const extension = path.extname(file.originalname)

        const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif"]

        if(!allowedExtensions.includes(extension)) {
            callback(new Error("Not an image"))
            return
        }

        callback(null, true)
    },
    limits: { fileSize: Bytes.mbToB(5) }
})

module.exports = MulterService