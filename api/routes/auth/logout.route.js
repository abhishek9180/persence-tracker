const express = require('express');
const jwtService = require('../../jwt/jwt-service');
const loginSchema = require('../../validators/login.validator');
const ErrorModel = require('../../models/error-model');
const router = express.Router();

router.head('/', (req, res) => {
    res.cookie('accessToken', '', { httpOnly: true });
    res.status(200).send()
})

module.exports = router;