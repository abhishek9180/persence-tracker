const express = require('express');
const jwtService = require('../../jwt/jwt.service');
const bcrypt = require('../../bcrypt/bcrypt.service');
const loginValidator = require('../../helpers/validators/login.validator');
const ErrorModel = require('../../models/error-model');
const userService = require('../../mongodb/services/user.service');


const router = express.Router();

router.post('/', (req, res) => {
    const { error, value } = loginValidator.validate(req.body);
    if (error) {
        const loginError = new ErrorModel({
            code: 422,
            type: 'login',
            message: 'Invalid inputs',
            description: error.details[0].message
        });
        return res.status(loginError.code).send(loginError);
    }
    userService.findUserByEmail(value.email).then(user => {
        bcrypt.compareHash(value.password, user.password).then(isMatch => {
            if (isMatch) {
                jwtService.generateToken(value).then(token => {
                    res.cookie('accessToken', token, { Path: "/", httpOnly: true });
                    if (user['password']) {
                        delete user.password;
                        console.log("pass: ", user);
                    }
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
        }).catch(wrongPassword => {
            const loginError = new ErrorModel({
                code: 401,
                type: 'login',
                message: 'Invalid password',
                description: 'Password does not match'
            });
            res.status(loginError.code).send(loginError);
        })
    }).catch(noUser => {
        const loginError = new ErrorModel({
            code: 401,
            type: 'login',
            message: 'Invalid user',
            description: 'User does not exist'
        });
        res.status(loginError.code).send(loginError);
    })


})

module.exports = router;