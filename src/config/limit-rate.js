const TimeUnits = require("../utils/time-units")

const signup = {
    windowMs: TimeUnits.hourToMs(3),
    max: 5,
    message: "You can only create 5 accounts every 3 hours",
    standardHeaders: true,
    legacyHeaders: false
}

const login = {
    windowMs: TimeUnits.minuteToMs(30),
    max: 15,
    message: "You can only login 15 times every 30 minutes",
    standardHeaders: true,
    legacyHeaders: false
}

const username = {
    windowMs: TimeUnits.minuteToMs(30),
    max: 10,
    message: "You can only change name 10 times every 30 minutes",
    standardHeaders: true,
    legacyHeaders: false
}

const img = {
    windowMs: TimeUnits.minuteToMs(30),
    max: 10,
    message: "You can only change image 10 times every 30 minutes",
    standardHeaders: true,
    legacyHeaders: false
}

const rating = {
    windowMs: TimeUnits.secondToMs(2),
    max: 1,
    message: "You can only change rate 1 time every 2 seconds",
    standardHeaders: true,
    legacyHeaders: false
}

module.exports = {
    signup,
    login,
    username,
    img,
    rating
}