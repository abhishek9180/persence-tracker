const express = require('express');

const bcrypt = require('../../bcrypt/bcrypt.service');
const userValidator = require('../../helpers/validators/user.validator');
const userService = require('../../mongodb/services/user.service');

const ErrorModel = require('../../models/error-model');


const router = express.Router();


router.get('/:id', (req, res) => {
    const id = req.params.id;
    userService.findUserById(id).then(user => {
        // delete password
        if (user.hasOwnProperty('password')) {
            delete user.password;
        }
        res.status(200).send(user);
    }).catch(err => {
        res.status(err.code).send(err);
    });
});

router.post('/', (req, res) => {
    const { error, value } = userValidator.validate(req.body);
    if (error) {
        const reportError = new ErrorModel({
            code: 422,
            type: 'validation',
            message: 'Invalid inputs',
            description: error.details[0].message
        });
        return res.status(reportError.code).send(reportError);
    }
    // Hash password
    bcrypt.generateHash(value.password).then(password => {

        value.password = password;
        userService.addNewUser(value).then(user => {
            // delete password
            if (user.hasOwnProperty('password')) {
                delete user.password;
            }
            res.status(200).send(user);
        }).catch(err => {
            res.status(err.code).send(err);
        })
    }).catch(hashErr => {
        res.status(hashErr.code).send(hashErr);
    });

});

module.exports = router;