const express = require('express');
const jwtService = require('../../jwt/jwt-service');
const bcrypt = require('../../bcrypt/bcrypt');
const loginSchema = require('../../validators/login.validator');
const ErrorModel = require('../../models/error-model');
const userOperation = require('../../mysql/operation/user.operation');
const router = express.Router();

router.post('/', (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        const loginError = new ErrorModel({
            code: 422,
            type: 'login',
            message: 'Invalid inputs',
            description: error.details[0].message
        });
        res.status(loginError.code).send(loginError);
    } else {
        userOperation.findUserByEmail(value.username).then(user => {
            bcrypt.compareHash(value.password, user.password).then(isMatch => {
                if (isMatch) {
                    value['oemType'] = user.oemType;
                    jwtService.generateToken(value).then(token => {
                        res.cookie('accessToken', token, { httpOnly: true });
                        delete user.password
                        res.status(200).send(user);
                    }).catch(error => {
                        let tokenError = new ErrorModel({
                            code: 500,
                            type: 'ServerError',
                            message: 'Error while generating token',
                            description: error
                        });
                        res.status(tokenError.code).send(tokenError);
                    });
                } else {
                    throw new Error("Password does not match");
                }
            }).catch(error => {
                const loginError = new ErrorModel({
                    code: 401,
                    type: 'login',
                    message: 'Invalid password',
                    description: 'Password does not match'
                });
                res.status(loginError.code).send(loginError);
            })
        }).catch(error => {
            const loginError = new ErrorModel({
                code: 401,
                type: 'login',
                message: 'Invalid user',
                description: 'User does not exist'
            });
            res.status(loginError.code).send(loginError);
        })
    }

})

module.exports = router;