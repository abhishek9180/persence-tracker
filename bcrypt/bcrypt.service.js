const bcrypt = require('bcrypt');

const saltRounds = 12;

function generateHash(plainText) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainText, saltRounds, function (err, hash) {
            if (err) {
                return reject(err);
            }
            resolve(hash);
        });
    })
}

function compareHash(plainText, hashText) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, function (err, result) {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    })
}

module.exports = {
    generateHash: generateHash,
    compareHash: compareHash
}