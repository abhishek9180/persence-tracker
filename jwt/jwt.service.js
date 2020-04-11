const jwt = require('jsonwebtoken');
const ErrorModel = require('../models/error-model');

// for now hardcoding, store it in environment var
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

const PUBLIC_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');

const i = 'presenceTracker';        // Issuer
const s = 'admin@presence-tracker.com';   // Subject
const a = 'http://presence-tracker.com'; // Audience
const t = '1h'; // Expire in 10 hours

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
                    description: "Access token is missing, Please login again."
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
                resolve(decoded);
            });
        });
    }
}