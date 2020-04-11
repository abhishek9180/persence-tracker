var mongoose = require('mongoose');
const ErrorModel = require('../../models/error-model');

module.exports = {
    checkDatabaseStability: checkDatabaseStability
};

function checkDatabaseStability(req, res, next) {
    if (mongoose.connection.readyState == 1) {
        return next();
    }
    else {
        handleDatabaseInstability(req, res, next);
    }
}

function handleDatabaseInstability(req, res, next) {
    let dbError = new ErrorModel({
        code: 500,
        type: 'dbError',
        message: 'Database ' + mongoose.STATES[mongoose.connection.readyState],
        description: 'Database ' + mongoose.STATES[mongoose.connection.readyState]
    });
    res.status(dbError.code).send(dbError);
}