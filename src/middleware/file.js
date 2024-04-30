const MulterService = require("../services/multer")

function middleware(req, res, next) {
    MulterService.single("image")(req, res, (err) => {
        if(err) {
            res.status(413).send({
                message: "Invalid Image",
                err: err.message
            })

            return
        }

        res.end("Success")
    })
}

module.exports = { middleware }