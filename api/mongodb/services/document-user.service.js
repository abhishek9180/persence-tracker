const ErrorModel = require('../../models/error-model');
const documentUserModel = require('../models/documentUserModel');


function addNewUserDocumentMapping(userDocumentInfo) {
    return new Promise((resolve, reject) => {
        const documentUser = new documentUserModel(userDocumentInfo);
        documentUser.save((error) => {
            const dbError = new ErrorModel({
                code: 503,
                type: 'database',
                message: 'Error in saving data.',
                description: error
            });
            return reject(dbError);
        });
        resolve(userDocumentInfo);
    })
}

function updateOrCreateUserDocumentByQuery(query, data) {
    return new Promise((resolve, reject) => {
        documentUserModel.findOneAndUpdate(query, data, { upsert: true, setDefaultsOnInsert: true }, (error, result) => {
            if (error) {
                const dbError = new ErrorModel({
                    code: 503,
                    type: 'database',
                    message: 'Error in saving data.',
                    description: error
                });
                return reject(dbError);
            }
            resolve(data);
        });
    });
}

function getDocumentActiveUsers(query) {
    return new Promise((resolve, reject) => {
        documentUserModel.find(query).populate('user', 'socketId firstName lastName email avtar').exec((error, result) => {
            if (error) {
                const dbError = new ErrorModel({
                    code: 503,
                    type: 'database',
                    message: 'Error in getting data.',
                    description: error
                });
                return reject(dbError);
            }
            resolve(result);
        });
    });
}

function updateUserDocumentByQuery(query, data) {
    return new Promise((resolve, reject) => {
        documentUserModel.findOneAndUpdate(query, data, (error, result) => {
            if (error) {
                const dbError = new ErrorModel({
                    code: 503,
                    type: 'database',
                    message: 'Error in saving data.',
                    description: error
                });
                return reject(dbError);
            }
            resolve(data);
        });
    });
}



module.exports = {
    addNewUserDocumentMapping: addNewUserDocumentMapping,
    updateUserDocumentByQuery: updateUserDocumentByQuery,
    getDocumentActiveUsers: getDocumentActiveUsers,
    updateOrCreateUserDocumentByQuery: updateOrCreateUserDocumentByQuery
}