const mysql = require('mysql');
const connectionDatasource = require('./connection/datasource.connnection');

const connection = mysql.createConnection(connectionDatasource);
function connectToDB() {
    return new Promise((resolve, reject) => {
        connection.connect(function (error) {
            if (error) {
                return reject(error);
            }
            resolve(connection);
        });
    })
}

module.exports = {
    connectToDB: connectToDB,
    connection: connection
};