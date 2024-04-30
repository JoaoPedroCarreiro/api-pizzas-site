const ORIGIN = process.env.NODE_ENV === "production" ? process.env.PROD_CLIENT_HOST : process.env.DEV_CLIENT_HOST
const HOST = process.env.NODE_ENV === "production" ? process.env.PROD_HOST : process.env.DEV_HOST + ":" + process.env.PORT

module.exports = { ORIGIN, HOST }