function hourToMs(n) {
    return n * 60 * 60 * 1000
}

function minuteToMs(n) {
    return n * 60 * 1000
}

function yearToSec(n) {
    return n * 365 * 24 * 60 * 60
}

function secondToMs(n) {
    return n * 1000
}

module.exports = {
    hourToMs,
    minuteToMs,
    yearToSec,
    secondToMs
}