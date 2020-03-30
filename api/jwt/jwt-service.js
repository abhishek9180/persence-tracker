const jwt = require('jsonwebtoken');
const bcrypt = require('../bcrypt/bcrypt');
const userOperation = require('../mysql/operation/user.operation');
const tokenSchema = require('../validators/token.validator');
const ErrorModel = require('../models/error-model');

// for now hardcoding, store it in environment var
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const PUBLIC_KEY = process.env.PUBLIC_KEY;

const i = 'Magna';        // Issuer
const s = 'admin@magna.com';   // Subject
const a = 'http://magna.com'; // Audience
const t = '10h'; // Expire in 10 hours

const signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: t,
    algorithm: "RS256"
};

const verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: t,
    algorithms: ["RS256"]
};

module.exports = {
    generateToken: function (payload) {
        return new Promise((resolve, reject) => {
            if (!Object.keys(payload).length) {
                const error = new Error("Invalid payload");
                return reject(error);
            }
            jwt.sign(payload, PRIVATE_KEY, signOptions, function (err, token) {
                if (err) {
                    return reject(err);
                }
                resolve(token);
            });
        });
    },

    verifyToken: function (token) {
        return new Promise((resolve, reject) => {
            if (!token) {
                const loginError = new ErrorModel({
                    code: 401,
                    type: 'login',
                    message: 'Invalid token',
                    description: error.details[0].message
                });
                return reject(loginError);
            }
            jwt.verify(token, PUBLIC_KEY, verifyOptions, function (err, decoded) {
                if (err) {
                    const loginError = new ErrorModel({
                        code: 401,
                        type: 'login',
                        message: 'Invalid token',
                        description: 'can not verify token.'
                    });
                    return reject(loginError);
                }
                const { error, value } = tokenSchema.validate(decoded);
                if (error) {
                    const loginError = new ErrorModel({
                        code: 401,
                        type: 'login',
                        message: 'Invalid token',
                        description: error.details[0].message
                    });
                    return reject(loginError);
                } else {
                    userOperation.findUserByEmail(value.username)
                        .then(user => {
                            bcrypt.compareHash(value.password, user.password)
                                .then(isMatch => {
                                    if (isMatch) {
                                        return resolve(value);
                                    } else {
                                        throw new Error("Password does not match");
                                    }
                                })
                                .catch(error => {
                                    const loginError = new ErrorModel({
                                        code: 401,
                                        type: 'login',
                                        message: 'Invalid password',
                                        description: 'Password does not match'
                                    });
                                    return reject(loginError);
                                });
                        })
                        .catch(userError => {
                            const loginError = new ErrorModel({
                                code: 401,
                                type: 'login',
                                message: 'Invalid user',
                                description: 'User does not exist'
                            });
                            return reject(loginError);
                        });
                }
            });
        });
    }
}