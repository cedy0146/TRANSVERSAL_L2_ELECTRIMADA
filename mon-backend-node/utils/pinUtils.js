const crypto = require('crypto');

function hashPin(pin) {
    return crypto.createHash('sha256').update(String(pin)).digest('hex');
}

function comparePin(pin, hash) {
    return hashPin(pin) === hash;
}

module.exports = { hashPin, comparePin };