const mySqlConnection = require('../connection');

const connection = mySqlConnection.connection;

function findUserByEmail(email) {
    const query = `SELECT * FROM user WHERE username='${email}'`;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
}

module.exports = {
    findUserByEmail: findUserByEmail
}