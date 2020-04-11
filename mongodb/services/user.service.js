const ErrorModel = require('../../models/error-model');
const userModel = require('../models/userModel');


function addNewUser(userInfo) {
    return new Promise((resolve, reject) => {
        const user = new userModel(userInfo);
        user.save((error) => {
            const dbError = new ErrorModel({
                code: 503,
                type: 'database',
                message: 'Error in creating user.',
                description: error
            });
            return reject(dbError);
        });
        // delete password
        delete userInfo.password;
        resolve(userInfo);
    })
}

function findUserByEmail(userEmail) {
    return new Promise((resolve, reject) => {
        userModel.findOne({ 'email': userEmail }, (err, user) => {
            if (err) {
                const dbError = new ErrorModel({
                    code: 503,
                    type: 'database',
                    message: 'Error in getting user.',
                    description: error
                });
                return reject(dbError);
            }
            resolve(user);
        });
    })
}

function findUserById(id) {
    return new Promise((resolve, reject) => {
        userModel.findById(id)
            .select("-password")
            .exec((err, user) => {
                if (err) {
                    const dbError = new ErrorModel({
                        code: 503,
                        type: 'database',
                        message: 'Error in getting user.',
                        description: error
                    });
                    return reject(dbError);
                }
                resolve(user);
            });
    })
}


module.exports = {
    addNewUser: addNewUser,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById
};